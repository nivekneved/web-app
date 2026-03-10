'use client'

import React from 'react'

type FilterOptions = {
    priceRange: [number, number]
    rating: number
    amenities: string[]
    sortBy: 'price' | 'rating' | 'popularity'
}

type AdvancedFiltersProps = {
    filters: FilterOptions
    onFilterChange: (filters: FilterOptions) => void
    availableAmenities?: string[]
}

export default function AdvancedFilters({ filters, onFilterChange, availableAmenities = [] }: AdvancedFiltersProps) {
    const [localFilters, setLocalFilters] = React.useState(filters)
    const [isOpen, setIsOpen] = React.useState(false)

    function updateFilter<K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) {
        const updated = { ...localFilters, [key]: value }
        setLocalFilters(updated)
    }

    function applyFilters() {
        onFilterChange(localFilters)
        setIsOpen(false)
    }

    function resetFilters() {
        const reset: FilterOptions = {
            priceRange: [0, 100000],
            rating: 0,
            amenities: [],
            sortBy: 'popularity'
        }
        setLocalFilters(reset)
        onFilterChange(reset)
    }

    return (
        <div className="relative">
            {/* Filter Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:border-red-600 transition-all flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
            </button>

            {/* Filter Panel */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 z-50">
                    <div className="space-y-6">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                Price Range
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    step="1000"
                                    value={localFilters.priceRange[1]}
                                    onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
                                    className="w-full accent-red-600"
                                />
                                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                    <span>Rs 0</span>
                                    <span className="font-bold text-red-600">Rs {localFilters.priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                Minimum Rating
                            </label>
                            <div className="flex gap-2">
                                {[0, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => updateFilter('rating', rating)}
                                        className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${localFilters.rating === rating
                                            ? 'bg-red-600 text-white'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                            }`}
                                    >
                                        {rating === 0 ? 'Any' : `${rating}⭐`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                Sort By
                            </label>
                            <select
                                value={localFilters.sortBy}
                                onChange={(e) => updateFilter('sortBy', e.target.value as 'price' | 'rating' | 'popularity')}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                            >
                                <option value="popularity">Popularity</option>
                                <option value="price">Price (Low to High)</option>
                                <option value="rating">Rating (High to Low)</option>
                            </select>
                        </div>

                        {/* Amenities */}
                        {availableAmenities.length > 0 && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                    Amenities
                                </label>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {availableAmenities.map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={localFilters.amenities.includes(amenity)}
                                                onChange={(e) => {
                                                    const updated = e.target.checked
                                                        ? [...localFilters.amenities, amenity]
                                                        : localFilters.amenities.filter(a => a !== amenity)
                                                    updateFilter('amenities', updated)
                                                }}
                                                className="w-4 h-4 accent-red-600"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={resetFilters}
                                className="flex-1 px-4 py-2 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                            >
                                Reset
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}
