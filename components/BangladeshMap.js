'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import Image from 'next/image'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// FIXED: Custom blue marker for districts with news (as per reference screenshot)
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

// FIXED: Component to handle map flying animation when district is selected
function FlyToDistrict({ coordinates, zoom }) {
    const map = useMap()

    useEffect(() => {
        if (coordinates) {
            // FIXED: Smooth flyTo animation with proper duration and easing
            map.flyTo([coordinates.lat, coordinates.lng], zoom || 10, {
                duration: 1.5,
                easeLinearity: 0.25
            })
        }
    }, [coordinates, zoom, map])

    return null
}

export default function BangladeshMap({ districtCoordinates, newsData, selectedDistrict, onMarkerClick }) {
    // FIXED: Get districts that have news from real API data (not fake data)
    const districtsWithNews = newsData ? Object.keys(newsData).filter(d => newsData[d].length > 0) : []

    return (
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
            {/* FIXED: Full-width interactive map with proper center on Bangladesh */}
            <MapContainer
                center={[23.7, 90.4]}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
                className="z-10"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* FIXED: FlyTo animation when district is selected from search or marker click */}
                {selectedDistrict && districtCoordinates[selectedDistrict] && (
                    <FlyToDistrict coordinates={districtCoordinates[selectedDistrict]} zoom={10} />
                )}

                {/* FIXED: Render blue markers ONLY for districts with news (from API) */}
                {districtsWithNews.map((district) => {
                    const coords = districtCoordinates[district]
                    const news = newsData[district] || []

                    if (!coords || news.length === 0) return null

                    return (
                        <Marker
                            key={district}
                            position={[coords.lat, coords.lng]}
                            icon={blueIcon}
                            eventHandlers={{
                                // FIXED: Marker click triggers flyTo + shows popup
                                click: () => onMarkerClick(district)
                            }}
                        >
                            {/* FIXED: Popup with 3-5 news teasers + link to district page */}
                            <Popup className="custom-popup" maxWidth={350}>
                                <div className="p-2">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        {coords.bengali} ({coords.division})
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 capitalize">
                                        {district} District • {news.length} {news.length === 1 ? 'article' : 'articles'}
                                    </p>

                                    {/* FIXED: Show first 3-5 news items from real API data */}
                                    <div className="space-y-3 mb-3">
                                        {news.slice(0, 5).map((item) => (
                                            <div key={item._id} className="flex gap-2 border-b pb-2 last:border-b-0">
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/news/${item.category}/${item._id}`}>
                                                        <p className="text-xs font-bold text-gray-900 line-clamp-2 mb-1 hover:text-blue-600 cursor-pointer">
                                                            {item.title}
                                                        </p>
                                                    </Link>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span className="px-1.5 py-0.5 bg-blue-500 text-white rounded capitalize">
                                                            {item.category}
                                                        </span>
                                                        <span>{item.views || 0} views</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* FIXED: Link to full district page (/saradesh/:district) */}
                                    <Link
                                        href={`/saradesh/${district}`}
                                        className="block w-full text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition-colors"
                                    >
                                        View all news from {district} →
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    )
}
