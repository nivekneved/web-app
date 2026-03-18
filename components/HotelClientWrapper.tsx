'use client'

import { useState } from 'react'
import { MapPin, Check, ArrowLeft, Calendar, Users, Heart, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import { Breadcrumbs } from './ui/Breadcrumbs'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import StarRating from './ui/StarRating'

type RoomType = {
    type: string;
    price: number;
    image_url?: string;
    images?: string[]; // Support for multiple images
    features?: string[];
    available?: boolean;
    prices?: Record<string, string>;
}

type Hotel = {
    id: string
    name: string
    description: string
    location: string
    region: string
    base_price: number
    rating: number
    image_url: string
    amenities: string[]
    room_types?: RoomType[]
}

export default function HotelClientWrapper({ hotel }: { hotel: Hotel }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const [activeGallery, setActiveGallery] = useState<{ images: string[], title: string } | null>(null)
    const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0)

    function toggleWishlist() {
        if (!hotel) return
        if (isInWishlist(hotel.id)) {
            removeFromWishlist(hotel.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist({
                id: hotel.id,
                service_type: 'hotel',
                name: hotel.name,
                image_url: hotel.image_url,
                base_price: hotel.base_price,
                location: hotel.location
            })
            toast.success('Added to wishlist')
        }
    }
    
    const getDayKey = (dateString: string) => {
        if (!dateString) return new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
        return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    }

    const currentDayKey = getDayKey(checkIn);

    function handleBookNow() {
        if (!checkIn || !checkOut) {
            toast.error('Please select check-in and check-out dates')
            return
        }
        if (!selectedRoom && hotel.room_types && hotel.room_types.length > 0) {
            toast.error('Please select a room type')
            const element = document.getElementById('rooms-selection');
            element?.scrollIntoView({ behavior: 'smooth' });
            return
        }
        setShowWizard(true)
    }

    const onBookingConfirm = async (formData: BookingWizardData) => {
        setBookingLoading(true)
        try {
            // Find the room type selected in the wizard to get its correct price
            const roomInWizard = hotel.room_types?.find(r => r.type === formData.roomPreference);
            const calculatedAmount = roomInWizard 
                ? (parseFloat(roomInWizard.prices?.[currentDayKey] || roomInWizard.prices?.mon || roomInWizard.price?.toString() || '0') || hotel.base_price)
                : hotel.base_price;

            const { success, error } = await createBookingRequest({
                serviceId: hotel.id,
                serviceName: hotel.name,
                serviceCategory: 'hotel',
                amount: calculatedAmount,
                startDate: formData.checkIn || checkIn,
                endDate: formData.checkOut || checkOut,
                paxAdults: formData.guests || guests,
                roomPreference: formData.roomPreference || selectedRoom?.type,
                paxChildren: 0,
                travelers: formData.travelers as Record<string, unknown>[],
                specialRequests: formData.notes,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
            })

            if (success) {
                toast.success('Booking request sent successfully!')
                setShowWizard(false)
            } else {
                throw new Error(error || 'Booking failed')
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to send booking request'
            console.error('Booking error:', error)
            toast.error(message)
        } finally {
            setBookingLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[65vh] w-full overflow-hidden">
                <Image
                    src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="bg-white/10 backdrop-blur-md text-white hover:bg-white/30 rounded-full"
                    >
                        <Link href="/hotels">
                            <ArrowLeft size={20} />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleWishlist}
                        className={cn(
                            "backdrop-blur-md rounded-full text-white transition-all",
                            isInWishlist(hotel.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/30'
                        )}
                        aria-label={isInWishlist(hotel.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={20} fill={isInWishlist(hotel.id) ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                <div className="absolute bottom-16 left-8 right-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge variant="destructive" className="px-4 py-1.5 shadow-xl shadow-red-600/20">
                                Luxury Stay
                            </Badge>
                            <div className="flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                                <StarRating rating={hotel.rating} size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">{hotel.rating} / 5</span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                            {hotel.name}
                        </h1>
                        <div className="flex items-center gap-3 text-white/90 font-medium text-lg">
                            <MapPin size={22} className="text-red-500" />
                            {hotel.location}, {hotel.region}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-16">
                <Breadcrumbs 
                    items={[
                        { label: 'Hotels', href: '/hotels' },
                        { label: hotel.name, active: true }
                    ]}
                    className="mb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-3">Introduction</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">About this destination</h3>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {hotel.description}
                            </p>
                        </section>

                        <section id="rooms-selection">
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-3">Accommodation</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Choose Your Room</h3>
                            <div className="space-y-6">
                                {hotel.room_types && hotel.room_types.length > 0 ? (
                                    hotel.room_types.map((room, idx) => {
                                        const isSelected = selectedRoom?.type === room.type;
                                        // Dynamic price logic based on check-in
                                        const roomPrice = parseFloat(room.prices?.[currentDayKey] || room.prices?.mon || room.price?.toString() || hotel.base_price.toString());
                                        
                                        return (
                                            <div 
                                                key={idx} 
                                                onClick={() => setSelectedRoom(room)}
                                                className={cn(
                                                    "flex flex-col md:flex-row gap-6 p-6 rounded-[2.5rem] border transition-all duration-500 cursor-pointer group",
                                                    isSelected 
                                                        ? "bg-slate-900 border-slate-900 shadow-2xl shadow-slate-200 scale-[1.02]" 
                                                        : "bg-white border-slate-100 hover:border-red-200 shadow-sm hover:shadow-xl hover:shadow-slate-100"
                                                )}
                                            >
                                                <div className="relative w-full md:w-64 h-48 rounded-[2rem] overflow-hidden shrink-0">
                                                    <Image
                                                        src={room.image_url || hotel.image_url}
                                                        alt={room.type}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    
                                                    {room.images && room.images.length > 0 && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveGallery({ images: [room.image_url || hotel.image_url, ...(room.images || [])], title: room.type });
                                                                setCurrentGalleryIdx(0);
                                                            }}
                                                            className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md text-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg border border-red-50"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Users size={14} className="animate-pulse" />
                                                                <span className="text-[9px] font-black uppercase tracking-widest leading-none">View Gallery ({room.images.length + 1})</span>
                                                            </div>
                                                        </button>
                                                    )}

                                                    {isSelected && (
                                                        <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center backdrop-blur-[2px]">
                                                            <div className="bg-white text-red-600 p-2 rounded-full shadow-lg">
                                                                <Check size={20} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between py-2">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className={cn("text-2xl font-black tracking-tight", isSelected ? "text-white" : "text-slate-900")}>
                                                                {room.type}
                                                            </h4>
                                                            <div className="text-right">
                                                                <div className={cn("text-2xl font-black", isSelected ? "text-red-400" : "text-red-600")}>
                                                                    MUR {roomPrice.toLocaleString()}
                                                                </div>
                                                                <div className={cn("text-[8px] font-black uppercase tracking-widest", isSelected ? "text-slate-500" : "text-slate-400")}>
                                                                    Per Night
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className={cn("text-sm mb-4 font-medium leading-relaxed", isSelected ? "text-slate-400" : "text-slate-500")}>
                                                            Indulge in our refined {room.type.toLowerCase()} featuring premium amenities and world-class comfort.
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {room.features?.map((f, i) => (
                                                                <span key={i} className={cn(
                                                                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-colors",
                                                                    isSelected 
                                                                        ? "bg-white/5 border-white/10 text-slate-300" 
                                                                        : "bg-slate-50 border-slate-100 text-slate-500"
                                                                )}>
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold">Multiple room types coming soon...</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-3">Experience</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Premium Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {hotel.amenities?.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                                            <Check size={20} />
                                        </div>
                                        <span className="font-black text-xs uppercase tracking-widest text-slate-600">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <ReviewsSection serviceId={hotel.id} serviceType="hotel" />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                                <div className="flex items-end gap-2 mb-10">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">
                                        MUR {selectedRoom 
                                            ? parseFloat(selectedRoom.prices?.[currentDayKey] || selectedRoom.prices?.mon || selectedRoom.price?.toString() || hotel.base_price.toString()).toLocaleString()
                                            : hotel.base_price.toLocaleString()}
                                    </span>
                                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">/ night</span>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Check In</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                <input
                                                    type="date"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Check Out</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                <input
                                                    type="date"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Number of Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <select
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm appearance-none transition-all"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                            >
                                                {[1, 2, 3, 4, 5, 6].map(n => (
                                                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <Button
                                        size="xl"
                                        onClick={handleBookNow}
                                        className="w-full"
                                    >
                                        Book Now
                                    </Button>

                                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        No payment required at this stage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showWizard && (
                <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 overflow-y-auto animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 md:py-20 relative">
                        <button 
                            onClick={() => setShowWizard(false)}
                            className="absolute top-12 right-8 md:right-12 p-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-[110]"
                        >
                            <X size={28} />
                        </button>
                        <div className="mb-12">
                            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.4em] mb-4">Reservation</h2>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Your Stay at {hotel.name}</h1>
                        </div>
                        <BookingWizard
                            serviceId={hotel.id}
                            serviceName={hotel.name}
                            servicePrice={selectedRoom 
                                ? (parseFloat(selectedRoom.prices?.[currentDayKey] || selectedRoom.prices?.mon || selectedRoom.price?.toString() || '0') || hotel.base_price)
                                : hotel.base_price}
                            serviceCategory="hotel"
                            initialData={{
                                checkIn,
                                checkOut,
                                guests,
                                roomPreference: selectedRoom?.type
                            }}
                            onComplete={onBookingConfirm}
                            isLoading={bookingLoading}
                            roomOptions={hotel.room_types?.map(r => r.type)}
                            showRoomSelection={true}
                        />
                    </div>
                </div>
            )}

            {/* Room Image Gallery Modal */}
            {activeGallery && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <button 
                        onClick={() => setActiveGallery(null)}
                        className="absolute top-8 right-8 p-4 text-white hover:text-red-500 transition-colors z-[210] bg-white/10 rounded-full"
                    >
                        <X size={32} />
                    </button>

                    <div className="w-full max-w-6xl px-8 flex flex-col gap-8">
                        <div className="flex items-center justify-between text-white">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-2">Room Preview</h3>
                                <h2 className="text-3xl font-black tracking-tight">{activeGallery.title}</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Image</span>
                                <div className="text-2xl font-black">{currentGalleryIdx + 1} / {activeGallery.images.length}</div>
                            </div>
                        </div>

                        <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden group shadow-2xl">
                            <Image
                                src={activeGallery.images[currentGalleryIdx]}
                                alt={`${activeGallery.title} - ${currentGalleryIdx + 1}`}
                                fill
                                className="object-cover animate-in fade-in duration-500"
                            />
                            
                            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => setCurrentGalleryIdx(prev => (prev > 0 ? prev - 1 : activeGallery.images.length - 1))}
                                    className="p-5 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white/30 transition-all border border-white/20"
                                >
                                    <ArrowLeft size={32} />
                                </button>
                                <button 
                                    onClick={() => setCurrentGalleryIdx(prev => (prev < activeGallery.images.length - 1 ? prev + 1 : 0))}
                                    className="p-5 bg-brand-red text-white rounded-full hover:bg-red-600 transition-all shadow-xl shadow-red-600/20"
                                >
                                    <div className="rotate-180">
                                        <ArrowLeft size={32} />
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 px-2 custom-scrollbar">
                            {activeGallery.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentGalleryIdx(i)}
                                    className={cn(
                                        "relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2",
                                        currentGalleryIdx === i ? "border-red-500 scale-110 shadow-lg" : "border-transparent opacity-50 hover:opacity-100"
                                    )}
                                >
                                    <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
