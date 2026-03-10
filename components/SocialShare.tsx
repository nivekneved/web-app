'use client'

import React from 'react'
import { Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

type SocialShareProps = {
    url: string
    title: string
    description?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    function copyLink() {
        navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
        setIsOpen(false)
    }

    function shareOnFacebook() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    }

    function shareOnTwitter() {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    }

    function shareOnLinkedIn() {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    }

    function shareViaEmail() {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || '')}%0A%0A${encodeURIComponent(url)}`
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all flex items-center gap-2"
            >
                <Share2 size={18} />
                Share
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-3">Share this</h3>
                        <div className="space-y-2">
                            <button
                                onClick={shareOnFacebook}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1877F2] text-white rounded-xl hover:opacity-90 transition-all"
                            >
                                <Facebook size={20} />
                                Share on Facebook
                            </button>
                            <button
                                onClick={shareOnTwitter}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1DA1F2] text-white rounded-xl hover:opacity-90 transition-all"
                            >
                                <Twitter size={20} />
                                Share on Twitter
                            </button>
                            <button
                                onClick={shareOnLinkedIn}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-[#0A66C2] text-white rounded-xl hover:opacity-90 transition-all"
                            >
                                <Linkedin size={20} />
                                Share on LinkedIn
                            </button>
                            <button
                                onClick={shareViaEmail}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                            >
                                <Mail size={20} />
                                Share via Email
                            </button>
                            <button
                                onClick={copyLink}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-slate-900 transition-all"
                            >
                                <LinkIcon size={20} />
                                Copy Link
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
