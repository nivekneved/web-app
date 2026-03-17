'use client'

import { Shield, Lock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: "Who we are",
            content: "Our website address is: https://travellounge.mu. At Travel Lounge, we are committed to maintaining the trust and confidence of our visitors to our web site."
        },
        {
            title: "Comments",
            content: "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it."
        },
        {
            title: "Media",
            content: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website."
        },
        {
            title: "Cookies",
            content: "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year. If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies."
        },
        {
            title: "Embedded content from other websites",
            content: "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, and monitor your interaction with that embedded content."
        },
        {
            title: "Who we share your data with",
            content: "We do not sell, rent or trade email lists with other companies and businesses for marketing purposes. If you request a password reset, your IP address will be included in the reset email."
        },
        {
            title: "How long we retain your data",
            content: "If you leave a comment, the comment and its metadata are retained indefinitely. For users that register on our website (if any), we also store the personal information they provide in their user profile."
        },
        {
            title: "What rights you have over your data",
            content: "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you."
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="relative h-[250px] md:h-[350px] flex items-center justify-center bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Privacy Policy</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Last Updated: March 2026</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-12">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-xl text-slate-600 leading-relaxed">
                                This Privacy Policy outlines our procedures regarding the collection, use and disclosure of your information when you use our service and tells you about your privacy rights.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            {sections.map((section, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"
                                >
                                    <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                        <span className="text-red-600">{i + 1}.</span>
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white text-center mt-12">
                            <Lock size={40} className="text-red-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-4">Questions?</h3>
                            <p className="text-slate-400 mb-6">If you have any questions about this Privacy Policy, please contact us.</p>
                            <a href="mailto:reservation@travellounge.mu" className="inline-flex items-center gap-2 text-white font-bold bg-red-600 px-8 py-4 rounded-xl hover:bg-red-700 transition-colors">
                                Contact Data Officer
                                <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
