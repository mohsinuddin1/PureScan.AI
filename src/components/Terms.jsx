import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-200">
            {/* Minimalist Apple/Vercel Style Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:inline">Back</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain" />
                        <span className="font-semibold tracking-tight text-sm">PureScan AI</span>
                    </div>
                    <div className="w-10"></div> {/* Spacer to center logo */}
                </div>
            </nav>

            <main className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
                <header className="mb-16 border-b border-slate-200 pb-10">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Terms of Service</h1>
                    <p className="text-sm text-slate-500 mb-8">Updated {lastUpdated}</p>
                    <p className="text-base text-slate-600 leading-relaxed">
                        Welcome to PureScan AI. By accessing or using our mobile applications, web applications, and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Educational Tool, Not Medical Advice</h2>
                        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                            <p>
                                <strong className="text-slate-900 font-medium">PureScan AI is NOT a medical device, and the information provided is not medical advice.</strong> The toxicity scores, ingredient analyses, and personalized health insights are for informational and educational purposes only.
                            </p>
                            <p>
                                They should never replace professional medical diagnosis, advice, or treatment. Always consult with a qualified healthcare provider regarding dietary restrictions, allergies, or health conditions before making dietary lifestyle changes or using any product. Reliance on any information provided by PureScan AI is solely at your own risk.
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Subscriptions & Payments</h2>
                        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                            <p>
                                Some features of PureScan AI require a premium subscription. By subscribing, you agree to the pricing, payment terms, and billing increments presented at the time of purchase.
                            </p>
                            <p>
                                Subscriptions automatically renew unless canceled. You must cancel your subscription through the Apple App Store or Google Play Store settings at least 24 hours before the renewal date to avoid being charged for the next billing cycle. We do not directly handle refunds; all refund requests must be processed through the respective app store according to their policies.
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">User Conduct & Responsibilities</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            When using PureScan AI, you agree to the following conditions:
                        </p>
                        <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc list-inside">
                            <li>You are at least 13 years of age (or the minimum age of digital consent).</li>
                            <li>You are responsible for ensuring the accuracy of the health preferences you provide.</li>
                            <li>You will not use the app for any unlawful, unauthorized, or fraudulent purpose.</li>
                            <li>You will not attempt to exploit, hack, or reverse-engineer the services.</li>
                        </ul>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">AI Accuracy & Limitations</h2>
                        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                            <p>
                                PureScan AI leverages highly advanced optical character recognition (OCR) and machine learning models to analyze product labels. However, <strong className="text-slate-900 font-medium">food and cosmetic manufacturers frequently change their ingredients without warning, and blurry photos or damaged packaging can result in inaccurate scans.</strong>
                            </p>
                            <p>
                                If you have severe or life-threatening allergies, you must <strong className="text-slate-900 font-medium">always double-check the physical label</strong> on the product yourself before consuming or using it. We provide this tool to assist you, but it cannot guarantee 100% accuracy in every edge case.
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">User Data Ownership</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            You retain total ownership over the account data, health profiles, and dietary preferences you input into PureScan AI. We claim no intellectual property rights over your personal configuration. You are free to export, modify, or permanently delete this data at any time through the app's settings.
                        </p>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">Limitation of Liability</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            To the fullest extent permitted by applicable law, PureScan AI, its creators, affiliates, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc list-inside pl-2">
                            <li>Your access to or use of or inability to access or use the application.</li>
                            <li>Any health-related issues, allergic reactions, or adverse effects arising from products scanned.</li>
                            <li>Any unauthorized access, use, or alteration of your transmissions or content.</li>
                        </ul>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Changes to Terms</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">Questions about these Terms?</h3>
                        <p className="text-sm text-slate-500">Our support team is here to help.</p>
                    </div>
                    <a href="mailto:purescanai@outlook.com" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                        Contact Support
                    </a>
                </div>
            </main>

            <footer className="py-12 bg-[#FAFAFA] border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain grayscale opacity-50" />
                        <span className="font-semibold tracking-tight text-sm text-slate-400">PureScan AI</span>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
                        <a href="/grading" className="text-slate-500 hover:text-slate-900 transition-colors">Grading</a>
                        <a href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</a>
                        <a href="/terms" className="text-slate-900 font-medium">Terms</a>
                        <a href="/support" className="text-slate-500 hover:text-slate-900 transition-colors">Support</a>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-6 mt-6 text-center sm:text-left">
                    <p className="text-slate-400 text-xs">© {new Date().getFullYear()} PureScan AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
