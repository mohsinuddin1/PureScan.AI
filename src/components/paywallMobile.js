import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator,
    Linking,
    Dimensions,
    BackHandler,
    ScrollView,
} from 'react-native';
import Animated, {
    withRepeat,
    withSequence,
    withTiming,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';
import useStore from '../store/useStore';
import { getOfferings, purchasePackage, restorePurchases } from '../lib/purchases';
import { useAuth } from '../features/auth/AuthProvider';
import { analytics } from '../lib/analytics';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from '../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PLANS = [
    {
        id: 'annual',
        name: 'Annual',
        period: 'billed yearly',
        price: '$39.99',
        perWeek: '$0.77/week',
        trial: '3 days free trial',
        discount: 'Best Value',
        recommended: true,
    },
    {
        id: 'monthly',
        name: 'Monthly',
        period: 'billed monthly',
        price: '$8.99',
        perWeek: '$2.07/week',
        trial: null,
        discount: null,
        recommended: false,
    },
];

const FEATURES = [
    { icon: 'shield-checkmark', title: 'Total Family Protection', desc: 'Unlimited scans for food , Skincare & baby products.' },
    { icon: 'alert-circle', title: 'Hidden Toxins', desc: 'Catches dangerous chemicals under complex names.' },
    { icon: 'heart', title: 'Built for you', desc: 'Personalized to your health goals & allergies.' },
];

const REVIEWS = [
    { text: "This app is a total game changer! It helped me instantly spot harmful ingredients in our daily products that I would have never noticed otherwise." },
    { text: "I thought my 'organic' face wash was safe until I scanned it here. Found out it had hormone disruptors! Instantly switched to a cleaner brand." },
    { text: "My toddler has mild allergies and reading labels took forever. Now I just scan our snacks at the grocery store. Saves me so much time and stress." }
];

const INFINITE_REVIEWS = Array(50).fill(REVIEWS).flat();

export default function PaywallScreen({ navigation, route, isHardPaywall = false }) {
    const context = route?.params?.context || (isHardPaywall ? 'onboarding' : 'direct');
    const [selectedPlan, setSelectedPlan] = useState('$rc_annual');
    const [loading, setLoading] = useState(false);
    const [restoring, setRestoring] = useState(false);
    const [error, setError] = useState('');
    const [offerings, setOfferings] = useState(null);
    const [offeringsLoading, setOfferingsLoading] = useState(true);
    const [showClose] = useState(true); // Always visible — softer UX, less frustration
    const paywallOpenedAt = useRef(Date.now());
    const reviewsScrollRef = useRef(null);
    const currentReviewIndex = useRef(0);
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const isInteractingWithReviews = useRef(false);
    const reviewCardWidth = Math.min(Dimensions.get('window').width, 500) - scale(40);

    const { user, profile, fetchProfile, healthPreferences, scanHistory } = useStore();
    const { purchasesInitialized } = useAuth();
    const insets = useSafeAreaInsets();

    const goalLabel = useMemo(() => {
        if (!healthPreferences?.goals?.length) return 'Health';
        const firstGoal = healthPreferences.goals[0];
        const mapping = {
            skin: 'Clear Skin',
            'Clear Skin & Anti-Aging': 'Clear Skin',
            hormonal: 'Hormonal Balance',
            'Hormonal Balance': 'Hormonal Balance',
            weight: 'Weight Management',
            'Weight Management & Fitness': 'Weight Management',
            energy: 'Better Energy',
            'Better Energy & Sleep': 'Better Energy',
            family: 'Family Safety',
            'Toxin-Free Family': 'Family Safety',
            clean: 'Clean Living',
            'Clean & Natural Living': 'Clean Living',
        };
        return mapping[firstGoal] || (typeof firstGoal === 'string' && firstGoal !== 'General Safety' && firstGoal !== 'Better Health' && firstGoal !== 'None' ? firstGoal : 'Health');
    }, [healthPreferences]);

    const riskCount = useMemo(() => {
        if (!healthPreferences) return 0;
        const diseases = (healthPreferences.diseases || []).filter(x => x && x !== 'None').length;
        const allergies = (healthPreferences.allergies || healthPreferences.allergens || []).filter(x => x && x !== 'None').length;
        return diseases + allergies;
    }, [healthPreferences]);

    const cancellationDate = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }, []);

    // Pulse animation for the CTA button
    const pulseValue = useSharedValue(1);

    // Personalized copy from last scan result
    const lastScan = scanHistory?.[0];
    const harmfulCount = lastScan?.harmful_chemicals?.length || lastScan?.harmfulChemicals?.length || 0;
    const lastProduct = lastScan?.product_name || lastScan?.productName || '';

    const dynamicPlans = useMemo(() => {
        if (!offerings) {
            return [
                {
                    id: '$rc_annual',
                    name: 'Annual',
                    period: 'billed yearly',
                    price: '$39.99',
                    perWeek: '$0.77/week',
                    trial: '3 days free trial',
                    discount: 'Best Value',
                    savingPercentage: 63,
                    recommended: true,
                },
                {
                    id: '$rc_monthly',
                    name: 'Monthly',
                    period: 'billed monthly',
                    price: '$8.99',
                    perWeek: '$2.07/week',
                    trial: null,
                    discount: null,
                    recommended: false,
                },
            ];
        }

        const packages = offerings.availablePackages || [];
        const metadata = offerings.metadata || {};
        // Support both the old object map AND the flat keys just in case
        const highlights = metadata.highlights || {};
        if (metadata.highlight_package_id && metadata.highlight_message) {
            highlights[metadata.highlight_package_id] = metadata.highlight_message;
        }

        const annualPkg = packages.find(p => p.packageType === 'ANNUAL');
        const monthlyPkg = packages.find(p => p.packageType === 'MONTHLY');
        const weeklyPkg = packages.find(p => p.packageType === 'WEEKLY');

        let annualPrice = annualPkg ? annualPkg.product.price : 0;
        let monthlyPrice = monthlyPkg ? monthlyPkg.product.price : 0;
        let weeklyPrice = weeklyPkg ? weeklyPkg.product.price : 0;

        let annualSavingPercentage = null;
        if (annualPrice > 0) {
            if (weeklyPrice > 0) {
                const totalWeeklyForYear = weeklyPrice * 52;
                if (totalWeeklyForYear > annualPrice) {
                    annualSavingPercentage = Math.round(((totalWeeklyForYear - annualPrice) / totalWeeklyForYear) * 100);
                }
            } else if (monthlyPrice > 0) {
                const totalMonthlyForYear = monthlyPrice * 12;
                if (totalMonthlyForYear > annualPrice) {
                    annualSavingPercentage = Math.round(((totalMonthlyForYear - annualPrice) / totalMonthlyForYear) * 100);
                }
            }
        }

        const parseIntroPrice = (product) => {
            if (product.introPrice && product.introPrice.price === 0) {
                const { periodNumberOfUnits, periodUnit } = product.introPrice;
                if (periodNumberOfUnits && periodUnit) {
                    return `${periodNumberOfUnits} ${periodUnit.toLowerCase()}${periodNumberOfUnits > 1 ? 's' : ''} free trial`;
                }
                return 'Has free trial';
            }
            return null;
        };

        const generatePlanData = (pkg) => {
            const product = pkg.product;
            let price = product.priceString || '$0.00';
            let trial = parseIntroPrice(product);
            let perWeek = null;
            let name = pkg.packageType === 'ANNUAL' ? 'Annual' :
                pkg.packageType === 'MONTHLY' ? 'Monthly' :
                    pkg.packageType === 'WEEKLY' ? 'Weekly' : 'Plan';
            let period = pkg.packageType === 'ANNUAL' ? 'billed yearly' :
                pkg.packageType === 'MONTHLY' ? 'billed monthly' :
                    pkg.packageType === 'WEEKLY' ? 'billed weekly' : '';

            if (product.price) {
                const currencySymbol = price.replace(/[\d.,]/g, '').trim() || '$';
                if (pkg.packageType === 'ANNUAL') {
                    const weeklyValue = (product.price / 52).toFixed(2);
                    perWeek = `${currencySymbol}${weeklyValue}/week`;
                } else if (pkg.packageType === 'MONTHLY') {
                    const weeklyValue = ((product.price * 12) / 52).toFixed(2);
                    perWeek = `${currencySymbol}${weeklyValue}/week`;
                } else if (pkg.packageType === 'WEEKLY') {
                    perWeek = `${price}/week`;
                }
            }

            return {
                id: pkg.identifier,
                name: name,
                period: period,
                price: price,
                perWeek: perWeek,
                trial: trial,
                discount: highlights[pkg.identifier] || null,
                savingPercentage: pkg.packageType === 'ANNUAL' ? annualSavingPercentage : null,
                recommended: !!highlights[pkg.identifier],
            };
        };

        return packages.map(generatePlanData);
    }, [offerings]);

    const activePlan = dynamicPlans.find(plan => plan.id === selectedPlan) || dynamicPlans[0];

    // Apply dynamic default plan when offerings load
    useEffect(() => {
        if (offerings) {
            const metadata = offerings.metadata || {};
            if (metadata.default_package_id) {
                setSelectedPlan(metadata.default_package_id);
            } else if (offerings.availablePackages?.length > 0) {
                // Keep selected plan if it exists in new packages, otherwise default to first
                const exists = offerings.availablePackages.some(p => p.identifier === selectedPlan);
                if (!exists) setSelectedPlan(offerings.availablePackages[0].identifier);
            }
        }
    }, [offerings]);

    useEffect(() => {
        analytics.capture('paywall viewed', {
            context,
            scans_completed: profile?.scan_usage?.daily_scans || 0,
            is_pro: profile?.is_pro || false,
        });
        if (purchasesInitialized) {
            loadOfferingsWithRetry();
        }

        pulseValue.value = withRepeat(
            withSequence(
                withTiming(1.02, { duration: 800 }),
                withTiming(1, { duration: 800 })
            ),
            -1,
            true
        );
    }, [purchasesInitialized]);

    // (close button timer is now unified in the hook above)

    // Block Android back button when hard paywall is active
    useEffect(() => {
        if (!isHardPaywall) return;
        const onBackPress = () => true; // returning true prevents default back behavior
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => subscription.remove();
    }, [isHardPaywall]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isInteractingWithReviews.current) {
                clearInterval(interval);
                return;
            }
            // Move forward continuously to prevent fast reverse scrolling
            currentReviewIndex.current = currentReviewIndex.current + 1;

            if (currentReviewIndex.current >= INFINITE_REVIEWS.length) {
                currentReviewIndex.current = 0; // Fallback if user leaves it running for an hour
            }

            setActiveReviewIndex(currentReviewIndex.current);
            if (reviewsScrollRef.current) {
                reviewsScrollRef.current.scrollTo({
                    x: currentReviewIndex.current * reviewCardWidth,
                    animated: true,
                });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [reviewCardWidth]);

    const handleScrollEnd = (event) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / reviewCardWidth);
        if (index >= 0 && index < INFINITE_REVIEWS.length) {
            currentReviewIndex.current = index;
            setActiveReviewIndex(index);
        }
    };

    const animatedCtaStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: pulseValue.value }],
        };
    });

    const loadOfferingsWithRetry = async (maxRetries = 3) => {
        setOfferingsLoading(true);
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const current = await getOfferings();
                if (current) {
                    setOfferings(current);
                    setOfferingsLoading(false);

                    return;
                }
            } catch (e) {
                console.warn(`Offerings fetch attempt ${attempt} failed:`, e);
            }
            if (attempt < maxRetries) {
                await new Promise(r => setTimeout(r, 1500));
            }
        }
        setOfferingsLoading(false);
    };

    const handleSubscribe = async () => {
        setError('');
        setLoading(true);
        analytics.capture('purchase_started', { package_id: selectedPlan, context });

        try {
            let currentOfferings = offerings;

            // If offerings haven't loaded yet, do one final attempt to fetch them
            if (!currentOfferings && purchasesInitialized) {
                currentOfferings = await loadOfferingsAndReturn();
            }

            // No offerings at all — show clear error
            if (!currentOfferings) {
                setError('Subscription products are not available right now. Please check your internet connection and try again.');
                return;
            }

            const packages = currentOfferings.availablePackages || [];

            // Empty offering — App Store products may be rejected or not configured
            if (packages.length === 0) {
                setError('Subscriptions are currently unavailable. Please try again later.');
                return;
            }

            let pkg = packages.find(p => p.identifier === selectedPlan);

            // Last resort: grab first available package
            if (!pkg && packages.length > 0) {
                pkg = packages[0];
            }

            if (!pkg) {
                setError('Could not find the selected subscription plan. Please try again.');
                return;
            }

            analytics.capture('payment_sheet_shown', { package_id: selectedPlan, context, platform: Platform.OS });
            const { success, cancelled } = await purchasePackage(pkg);
            if (cancelled) {
                analytics.capture('payment_sheet_cancelled', {
                    package_id: selectedPlan,
                    context,
                    cancellation_type: 'payment_sheet_dismiss',
                    time_spent_seconds: Math.round((Date.now() - paywallOpenedAt.current) / 1000),
                });
                setError('Purchase was cancelled. You can try again.');
            } else if (success) {
                analytics.capture('purchase_succeeded', { package_id: selectedPlan, context, time_spent_seconds: Math.round((Date.now() - paywallOpenedAt.current) / 1000) });
                analytics.capture('purchase_completed', { package_id: selectedPlan, context, time_spent_seconds: Math.round((Date.now() - paywallOpenedAt.current) / 1000) });
                if (user?.id) {
                    await fetchProfile(user.id);
                }
                navigation.replace('Tabs');
            }
        } catch (err) {
            console.error('Purchase error:', err);
            analytics.capture('purchase_failed', {
                package_id: selectedPlan,
                error_code: err.code ?? null,
                error_message: err.message ?? String(err) ?? 'unknown',
                error_type: err.constructor?.name ?? null,
                context,
                platform: Platform.OS,
            });
            setError(err.message || 'Failed to complete purchase. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Returns the offerings directly (avoids stale React state in async flows)
    const loadOfferingsAndReturn = async () => {
        setOfferingsLoading(true);
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const current = await getOfferings();
                if (current) {
                    setOfferings(current);
                    setOfferingsLoading(false);
                    return current;
                }
            } catch (e) {
                console.warn(`Offerings fetch attempt ${attempt} failed:`, e);
            }
            if (attempt < 2) await new Promise(r => setTimeout(r, 1500));
        }
        setOfferingsLoading(false);
        return null;
    };

    const handleRestore = async () => {
        setRestoring(true);
        setError('');

        try {
            const { success } = await restorePurchases();
            if (success) {

                if (user?.id) {
                    await fetchProfile(user.id);
                }
                Alert.alert('Restored!', 'Your Pro subscription has been restored.', [
                    { text: 'OK', onPress: () => navigation.replace('Tabs') },
                ]);
            } else {

                setError('No active subscription found to restore.');
            }
        } catch (err) {

            setError(err.message || 'Failed to restore purchases');
        } finally {
            setRestoring(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Close — hidden on hard paywall */}
            {showClose && (
                <View style={styles.closeRow}>
                    <TouchableOpacity
                        onPress={() => {

                            if (isHardPaywall) {
                                // Hard paywall dismiss: mark onboarding complete and go to tabs
                                useStore.getState().setOnboarded();
                                analytics.capture('paywall_dismissed', { context, time_on_paywall_seconds: Math.round((Date.now() - paywallOpenedAt.current) / 1000), is_hard_paywall: true });
                                return;
                            }
                            analytics.capture('paywall_dismissed', { context, time_on_paywall_seconds: Math.round((Date.now() - paywallOpenedAt.current) / 1000), is_hard_paywall: false });
                            if (navigation.canGoBack && navigation.canGoBack()) {
                                navigation.goBack();
                            } else {
                                navigation.replace?.('Tabs') || navigation.navigate?.('Tabs');
                            }
                        }}
                        style={styles.closeBtn}
                    >
                        <Ionicons name="close" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Main Content — ScrollView ensures all plans are visible on any screen size */}
            <ScrollView
                style={styles.mainContent}
                contentContainerStyle={[styles.mainContentInner, isHardPaywall && { paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(10) }]}
                showsVerticalScrollIndicator={false}
                bounces={true}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.contentConstraint}>
                    {/* Hero */}
                    <View style={styles.heroContainer}>
                        <Text style={styles.heroHeadline}>
                            {harmfulCount > 0 ? 'We Found' : 'Meet Your'}
                        </Text>
                        <Text style={styles.heroHeadlineHighlight}>
                            {harmfulCount > 0
                                ? `${harmfulCount} Concern${harmfulCount > 1 ? 's' : ''} in ${lastProduct || 'Your Product'}`
                                : riskCount > 0
                                    ? `Your AI Found ${riskCount} Risk${riskCount > 1 ? 's' : ''} in Your Profile`
                                    : 'Personal Health Assistant'}
                        </Text>
                        <Text style={styles.heroSubtext}>
                            {harmfulCount > 0
                                ? 'What else is hiding in your home? '
                                : `Your trusted companion for safe shopping.\nLet's protect your ${goalLabel} together.`}
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresList}>
                        {FEATURES.map((feat, i) => (
                            <View key={i} style={styles.featureRow}>
                                <Ionicons name={feat.icon} size={20} color="#2E9E6D" style={{ marginRight: 10 }} />
                                <Text style={styles.featureText}>
                                    <Text style={{ fontWeight: 'bold', color: Colors.primary }}>{feat.title}: </Text>
                                    {feat.desc}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Reviews Slider */}
                    <View style={{ marginBottom: moderateVerticalScale(16) }}>
                        <ScrollView
                            ref={reviewsScrollRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={reviewCardWidth}
                            decelerationRate="fast"
                            contentContainerStyle={{ paddingHorizontal: 0 }}
                            onScrollBeginDrag={() => { isInteractingWithReviews.current = true; }}
                            onMomentumScrollEnd={handleScrollEnd}
                        >
                            {INFINITE_REVIEWS.map((review, idx) => (
                                <View key={idx} style={[styles.reviewCard, { width: reviewCardWidth, marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>
                                    <View style={styles.starsRow}>
                                        {[...Array(5)].map((_, i) => (
                                            <Ionicons key={i} name="star" size={16} color="#FFD700" />
                                        ))}
                                    </View>
                                    <Text style={styles.reviewText}>
                                        "{review.text}"
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>

                        {/* Pagination Dots */}
                        <View style={styles.dotsContainer}>
                            {REVIEWS.map((_, idx) => (
                                <View
                                    key={idx}
                                    style={[
                                        styles.dot,
                                        (activeReviewIndex % REVIEWS.length) === idx && styles.activeDot
                                    ]}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Error */}
                    {error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : null}
                </View>
            </ScrollView>

            {/* Bottom CTA — Fixed at bottom */}
            <View style={[styles.ctaContainer, { paddingBottom: (Platform.OS === 'ios' ? verticalScale(36) : verticalScale(32)) + insets.bottom }]}>
                {/* Plans moved to bottom */}
                <View style={[styles.plansSection, { marginBottom: moderateVerticalScale(16) }]}>
                    {dynamicPlans.map((plan) => (
                        <TouchableOpacity
                            key={plan.id}
                            onPress={() => {
                                setSelectedPlan(plan.id);

                            }}
                            style={[
                                styles.planCard,
                                selectedPlan === plan.id && styles.planCardSelected,
                            ]}
                            activeOpacity={0.9}
                        >
                            {plan.discount && (
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>{plan.discount}</Text>
                                </View>
                            )}
                            <View style={styles.planRow}>
                                <View
                                    style={[
                                        styles.radioCircle,
                                        selectedPlan === plan.id && styles.radioCircleSelected,
                                    ]}
                                >
                                    {selectedPlan === plan.id && (
                                        <Ionicons name="checkmark" size={12} color={Colors.white} />
                                    )}
                                </View>
                                <View style={{ flex: 1, marginLeft: 4 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.planName}>{plan.name}</Text>
                                        {plan.savingPercentage != null && plan.savingPercentage > 0 && (
                                            <View style={styles.saveBadgePill}>
                                                <Text style={styles.saveBadgeText}>SAVE {plan.savingPercentage}%</Text>
                                            </View>
                                        )}
                                    </View>
                                    {plan.perWeek ? <Text style={styles.planPerWeek}>{plan.perWeek}</Text> : null}
                                    {plan.trial && (
                                        <Text style={styles.planTrial}>{plan.trial}</Text>
                                    )}
                                </View>
                                <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Text style={styles.planTotal}>{plan.price}</Text>
                                    <Text style={styles.planPeriodText}>{plan.period}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <Animated.View style={animatedCtaStyle}>
                    <TouchableOpacity
                        onPress={handleSubscribe}
                        disabled={loading || offeringsLoading}
                        style={[styles.ctaBtn, (loading || offeringsLoading) && { opacity: 0.6 }]}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <View style={styles.ctaLoading}>
                                <ActivityIndicator size="small" color={Colors.white} />
                                <Text style={styles.ctaBtnText}>Processing...</Text>
                            </View>
                        ) : offeringsLoading ? (
                            <View style={styles.ctaLoading}>
                                <ActivityIndicator size="small" color={Colors.white} />
                                <Text style={styles.ctaBtnText}>Loading plans...</Text>
                            </View>
                        ) : (
                            <Text style={styles.ctaBtnText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                <View style={[styles.bottomRow, { justifyContent: 'space-evenly', marginTop: moderateVerticalScale(16) }]}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://purescan.droploop.in/terms')}>
                        <Text style={styles.legalLink}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRestore} disabled={restoring}>
                        <Text style={styles.restoreText}>
                            {restoring ? 'Restoring...' : 'Restore'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://purescan.droploop.in/privacy')}>
                        <Text style={styles.legalLink}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const MAX_CONTENT_WIDTH = 500;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },

    closeRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: scale(20), paddingTop: Platform.OS === 'ios' ? verticalScale(24) : verticalScale(16), marginBottom: 0 },
    closeBtn: { width: scale(36), height: scale(36), borderRadius: scale(18), alignItems: 'center', justifyContent: 'center' },

    // ScrollView takes remaining space; contentContainer handles spacing
    mainContent: { flex: 1 },
    mainContentInner: { flexGrow: 1, paddingHorizontal: scale(20), paddingVertical: moderateVerticalScale(16) },

    // Constrain content width on wider screens (iPad) for readability
    contentConstraint: { width: '100%', maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center' },

    // Hero
    heroContainer: { alignItems: 'center', marginBottom: moderateVerticalScale(16) },
    heroHeadline: { fontSize: moderateScale(20), fontWeight: '800', color: Colors.primary, textAlign: 'center' },
    heroHeadlineHighlight: { fontSize: moderateScale(24), fontWeight: '900', color: '#2E9E6D', textAlign: 'center', marginTop: moderateVerticalScale(2), marginBottom: moderateVerticalScale(6) },
    heroSubtext: { fontSize: moderateScale(13), color: Colors.textSecondary, textAlign: 'center', lineHeight: moderateScale(19), fontWeight: '500' },

    // Features
    featuresList: { marginHorizontal: scale(12), marginBottom: moderateVerticalScale(16) },
    featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: moderateVerticalScale(10) },
    featureText: { fontSize: moderateScale(13), color: Colors.textSecondary, flex: 1, lineHeight: moderateScale(18), fontWeight: '600' },

    // Review Card
    reviewCard: { backgroundColor: '#F8F9FA', padding: moderateScale(16), borderRadius: scale(16), marginTop: moderateVerticalScale(4), marginHorizontal: scale(12), borderWidth: 1, borderColor: Colors.borderLight },
    starsRow: { flexDirection: 'row', marginBottom: moderateVerticalScale(8), gap: scale(2) },
    reviewText: { fontSize: moderateScale(13), color: Colors.textSecondary, fontStyle: 'italic', lineHeight: moderateScale(20), fontWeight: '500' },
    dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: moderateVerticalScale(8), gap: scale(6) },
    dot: { width: scale(6), height: scale(6), borderRadius: scale(3), backgroundColor: Colors.borderLight },
    activeDot: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: Colors.primary },

    // Plans
    plansSection: { gap: moderateVerticalScale(12) },
    planCard: { padding: moderateScale(14), borderRadius: scale(20), borderWidth: 1.5, borderColor: Colors.borderLight, backgroundColor: '#FFFFFF', position: 'relative' },
    planCardSelected: { borderColor: Colors.primary, borderWidth: 2 },
    discountBadge: { position: 'absolute', top: -10, right: 20, backgroundColor: Colors.primary, paddingHorizontal: scale(10), paddingVertical: moderateVerticalScale(3), borderRadius: scale(14) },
    discountText: { fontSize: moderateScale(10), fontWeight: '800', color: Colors.white, letterSpacing: 0.5 },
    planRow: { flexDirection: 'row', alignItems: 'center', gap: scale(12) },
    radioCircle: { width: moderateScale(20), height: moderateScale(20), borderRadius: moderateScale(10), borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
    radioCircleSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary },
    planName: { fontSize: moderateScale(16), fontWeight: '800', color: Colors.primary },
    saveBadgePill: { backgroundColor: '#E8F5E9', paddingHorizontal: scale(8), paddingVertical: verticalScale(3), borderRadius: scale(10), borderWidth: 1, borderColor: '#A5D6A7', marginLeft: scale(8) },
    saveBadgeText: { color: '#2E9E6D', fontSize: moderateScale(10), fontWeight: '800', letterSpacing: 0.3 },
    planPerWeek: { fontSize: moderateScale(15), fontWeight: '800', color: Colors.primary, marginTop: moderateVerticalScale(2) },
    planTrial: { fontSize: moderateScale(11), fontWeight: '700', color: '#2E9E6D', marginTop: moderateVerticalScale(4) },
    planTotal: { fontSize: moderateScale(16), fontWeight: '800', color: Colors.primary },
    planPeriodText: { fontSize: moderateScale(12), color: Colors.textSecondary, marginTop: moderateVerticalScale(2), fontWeight: '500' },

    errorText: { color: Colors.danger, fontSize: moderateScale(12), textAlign: 'center', marginTop: moderateVerticalScale(4) },

    // CTA Fixed Bottom
    ctaContainer: { paddingHorizontal: scale(20), paddingBottom: Platform.OS === 'ios' ? verticalScale(32) : verticalScale(16), paddingTop: verticalScale(12), backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.04)' },
    ctaSocialContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: moderateVerticalScale(8), gap: scale(4) },
    ctaSocialText: { fontSize: moderateScale(11), color: Colors.textSecondary, fontWeight: '600' },
    ctaBtn: { backgroundColor: '#2E9E6D', paddingVertical: verticalScale(16), borderRadius: scale(16), alignItems: 'center', maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center', width: '100%', ...Shadows.elevated },
    ctaLoading: { flexDirection: 'row', alignItems: 'center', gap: scale(8) },
    ctaBtnText: { color: Colors.white, fontSize: moderateScale(16), fontWeight: '800' },
    subscriptionTermsText: { textAlign: 'center', color: Colors.textMuted, fontSize: moderateScale(9.5), marginTop: moderateVerticalScale(8), fontWeight: '400', lineHeight: moderateScale(13), maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center' },
    bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: moderateVerticalScale(10), maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center', width: '100%' },
    restoreText: { color: Colors.textSecondary, fontSize: moderateScale(11), textDecorationLine: 'underline' },
    legalRow: { flexDirection: 'row', alignItems: 'center', gap: scale(6) },
    legalLink: { fontSize: moderateScale(10), color: Colors.textMuted, textDecorationLine: 'underline' },
    legalDivider: { fontSize: moderateScale(10), color: Colors.textMuted },
});

