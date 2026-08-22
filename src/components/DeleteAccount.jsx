import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function DeleteAccount() {
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
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Delete Account</h1>
                    <p className="text-base text-slate-600 leading-relaxed">
                        To protect your privacy, you can request the permanent deletion of your PureScan AI account and all associated data. Please review the information below before proceeding.
                    </p>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">What Happens When You Delete Your Account</h2>
                        <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc list-inside">
                            <li>Your health profiles, dietary preferences, and all personal configuration will be permanently erased.</li>
                            <li>Your entire scanning history and saved product results will be removed.</li>
                            <li>Your account credentials and email association will be deleted from our systems.</li>
                            <li>All associated data is permanently purged within 30 days of the deletion request.</li>
                        </ul>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Irreversibility Notice</h2>
                        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                            <p>
                                <strong className="text-slate-900 font-medium">Once an account deletion request is initiated and processed, it cannot be reversed or retrieved.</strong> This action is permanent and there is no way to recover your data after deletion.
                            </p>
                            <p>
                                If you have an active premium subscription, please cancel it through the Apple App Store or Google Play Store before requesting account deletion. Deleting your account does not automatically cancel active subscriptions managed by the app stores.
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-5">Request Deletion</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                            To delete your account, click the button below to send an email to our support team. Please include the email address associated with your PureScan AI account. We will process your request and confirm deletion within 48 hours.
                        </p>
                        <a
                            href={"mailto:purescanai@outlook.com?subject=Account%20Deletion%20Request&body=Please%20delete%20my%20PureScan%20AI%20account%20associated%20with%20this%20email%20address.%0A%0AAccount%20Email%3A%20%5BYour%20Account%20Email%5D%0AReason%20(optional)%3A%20%5BYour%20Reason%5D%0A%0AI%20understand%20that%20this%20action%20is%20permanent%20and%20cannot%20be%20reversed."}
                            className="inline-block px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Request Account Deletion
                        </a>
                        <p className="text-sm text-slate-500 italic mt-4">
                            Note: You can also request account deletion directly from within the Settings page of the PureScan AI app.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">Need help with something else?</h3>
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
