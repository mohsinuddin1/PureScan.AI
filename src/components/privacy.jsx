import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Privacy Policy</h1>
                    <p className="text-sm text-slate-500 mb-8">Updated {lastUpdated}</p>
                    <p className="text-base text-slate-600 leading-relaxed">
                        Welcome to PureScan AI. We are committed to protecting your privacy and ensuring you have a safe experience when using our mobile applications, web applications, and services. This Privacy Policy outlines how we collect, use, and safeguard your data.
                    </p>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-5">Information We Collect</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 mb-1">Account Data</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">When you create an account, we collect your email address and securely store credentials to authenticate your access.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 mb-1">Health & Preference Data</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">To provide tailored toxicity scores, we may collect your self-reported dietary preferences, allergies, health conditions, or personal goals. This data is strictly used to evaluate the suitability of food and cosmetic items for your profile.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 mb-1">Camera & Photos</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Our core functionality requires accessing your device's camera to scan barcodes and labels. We do not permanently store images without your explicit permission.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 mb-1">Usage & Payment Data</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">We collect anonymous usage data to improve our services. Premium billing is handled securely via Apple App Store or Google Play Store; we never process or store your direct credit card information.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-5">How We Use Your Data</h2>
                        <ul className="space-y-4 text-sm text-slate-600 leading-relaxed list-disc list-inside">
                            <li><strong className="text-slate-900 font-medium">Personalization:</strong> Matching scanned items against your specific health profiles to generate accurate safety scores.</li>
                            <li><strong className="text-slate-900 font-medium">Core App Functionality:</strong> Maintaining your scanning history over time and synchronizing it securely across your devices.</li>
                            <li><strong className="text-slate-900 font-medium">Service Improvements:</strong> Understanding how our app is used to perform analytical research and improve capabilities.</li>
                        </ul>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">We NEVER Sell Your Data</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Your privacy is our absolute priority. We do not, and will never, sell your personal information, scanning history, or health profiles to advertisers or any third parties. Our business model is built on providing value to you, not monetizing your private data.
                        </p>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">AI Transparency</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            As an AI-powered platform, we believe in complete transparency. Our AI models are strictly designed to analyze product ingredients and nutritional labels. We do NOT use your personal data, dietary preferences, or the photos you take to train our AI models. Photos you scan are processed on the fly and discarded, ensuring your camera usage remains strictly private.
                        </p>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Bank-Level Security</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Your data is kept safe and completely secure within our database. The platform relies on battle-tested PostgreSQL security, automatically encrypting all your personal data at rest using AES-256 and in transit via TLS, ensuring that unauthorized parties can never access your health profiles or credentials. We only share necessary information with trusted service providers (e.g., Supabase, RevenueCat) bound by strict confidentiality agreements.
                        </p>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Children's Privacy</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            PureScan AI is not directed at or intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have inadvertently received personal data from a user under the age of 13, we will immediately delete such information from our records.
                        </p>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Your Rights & Data Deletion</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            You have total control over your data. At any point, you can request full deletion of your account and all associated personal data from within the Settings page of the app. Alternatively, you may contact our support team.
                        </p>
                        <p className="text-sm text-slate-500 italic">
                            Note: Once initiated, account deletion is irreversible and removes all your synced scanning history, preferences, and profile associations permanently.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">Questions about this policy?</h3>
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
                        <a href="/privacy" className="text-slate-900 font-medium">Privacy</a>
                        <a href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</a>
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
