'use client'

import React from 'react'
import Image from 'next/image'
import ServiceListing from '@/components/ServiceListing'
import { usePageContent } from '@/hooks/usePageContent'
import { resolveImageUrl } from '@/lib/image'

export default function FlightsPage() {
    const { content } = usePageContent('flights')
    const [iframeHeight, setIframeHeight] = React.useState('800px');
    const [isMounted, setIsMounted] = React.useState(false);

    const hero = content.hero || {};

    React.useEffect(() => {
        setIsMounted(true);
        const handleMessage = (event: MessageEvent) => {
            // Support for iFrame Resizer (commonly used by GOL IBE)
            if (typeof event.data === 'string' && event.data.startsWith('[iFrameSizer]')) {
                const parts = event.data.split(':');
                if (parts.length > 4) {
                    const newHeight = parseInt(parts[3], 10);
                    if (!isNaN(newHeight) && newHeight > 100) {
                        setIframeHeight(`${newHeight}px`);
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Prevent hydration mismatch for the dynamic iframe height
    if (!isMounted) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <div className="w-full bg-slate-50 py-12 md:py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[600px] flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[250px] md:h-[350px] flex items-center overflow-hidden bg-slate-900">
                <Image
                    src={resolveImageUrl(hero.image_url, "/assets/hero/tailormade_travel_hero_1773391405705.png")}
                    alt={hero.title || "Book Your Flight"}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                
                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center">
                    <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                        {hero.subtitle || "Global Connections"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
                        {hero.title || "Book Your Flight"}
                    </h1>
                    <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                        {hero.description || "Search hundreds of airlines and find the perfect connection to your dream destination."}
                    </p>
                </div>
            </section>

            {/* GOL IBE Search Form Integration */}
            <div className="w-full bg-slate-50 py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                        <div className="p-1 bg-primary/5 border-b border-primary/10 text-center py-3">
                            <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                                Global Flight Search Engine
                            </p>
                        </div>
                        
                        {/* 
                          * GOL IBE search form implementation_D4 version
                          * Opening results in a new tab as per latest user request
                          */}
                        <iframe 
                            id="golIbeIframe"
                            name="golIbeIframe"
                            src="https://travellounge.golibe.com/iframe?iframe=1&target=_blank&embedded=true" 
                            width="100%" 
                            height={iframeHeight}
                            frameBorder="0" 
                            allowTransparency={true}
                            className="w-full transition-all duration-500 ease-in-out"
                            style={{ height: iframeHeight }}
                        ></iframe>
                    </div>
                    
                    {/* Support Section */}
                    <div className="mt-12 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Need Assistance?</h2>
                        <p className="text-slate-600 mb-8">
                            If you prefer personalized assistance for your flight bookings, our expert travel consultants 
                            are ready to help you find the best connections and deals.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a 
                                href="/contact" 
                                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all"
                            >
                                Contact Consultant
                            </a>
                            <a 
                                href="https://wa.me/23059407701" 
                                target="_blank"
                                className="px-8 py-3 bg-[#25D366] text-white font-bold rounded-full hover:opacity-90 transition-all flex items-center gap-2"
                            >
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Service Listing for SEO/Data visibility if needed */}
            <div className="sr-only">
                <ServiceListing
                    title="Book Your Flight"
                    subtitle="Search hundreds of airlines and find the perfect connection to your dream destination."
                    heroImage="/hero-flight.png"
                    serviceTypes={['flight']}
                    tag="FLIGHT"
                    searchPlaceholder="Search flights, airlines, destinations..."
                />
            </div>
        </div>
    )
}
