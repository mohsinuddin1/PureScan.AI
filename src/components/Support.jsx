import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';

export default function Support() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-slate-200">
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

            <main className="flex-1 px-5 py-24 md:py-32 max-w-2xl mx-auto w-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                    <Mail className="w-5 h-5" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Support</h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
                    If you have any questions, issues, or feedback regarding the PureScan AI app, please reach out. We aim to respond within 24-48 hours.
                </p>
                
                <a 
                    href="mailto:purescanai@outlook.com"
                    className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                    Email Support Team
                </a>

                <p className="mt-8 text-sm text-slate-500">
                    Or email us directly at{' '}
                    <a href="mailto:purescanai@outlook.com" className="text-slate-900 font-medium hover:underline">
                        purescanai@outlook.com
                    </a>
                </p>
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
                        <a href="/support" className="text-slate-900 font-medium">Support</a>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-6 mt-6 text-center sm:text-left">
                    <p className="text-slate-400 text-xs">© {new Date().getFullYear()} PureScan AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
