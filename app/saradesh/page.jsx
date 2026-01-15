'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

import { bangladeshDistricts, districtCoordinates } from '@/lib/districts'


const BangladeshMap = dynamic(() => import('@/components/BangladeshMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-4"></div>
                <p className="text-gray-600">Loading interactive map...</p>
            </div>
        </div>
    )
})

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function SaraDeshPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [filteredDistricts, setFilteredDistricts] = useState([])
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)


    const [newsByDistrict, setNewsByDistrict] = useState({})
    const [districtsWithNews, setDistrictsWithNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchDistrictsWithNews = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/articles/districts`)
                const data = await res.json()
                console.log(data)


                setDistrictsWithNews(data || [])


                const newsPromises = data.map(async (district) => {
                    const newsRes = await fetch(`${API_BASE_URL}/api/articles?district=${district}&limit=5`)
                    const newsData = await newsRes.json()
                    return { district, articles: newsData.articles || [] }
                })

                const allNews = await Promise.all(newsPromises)
                const grouped = {}
                allNews.forEach(({ district, articles }) => {
                    grouped[district] = articles
                })

                setNewsByDistrict(grouped)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching districts with news:', error)
                setIsLoading(false)
            }
        }

        fetchDistrictsWithNews()
    }, [])


    const allDistricts = bangladeshDistricts.map(d => d.name)


    const handleSearch = (query) => {
        setSearchQuery(query)
        if (query.length > 0) {
            const filtered = bangladeshDistricts.filter(district =>
                district.name.toLowerCase().includes(query.toLowerCase()) ||
                district.bengali.includes(query)
            )
            setFilteredDistricts(filtered)
        } else {
            setFilteredDistricts([])
        }
    }


    const handleDistrictSelect = (districtName) => {
        setSelectedDistrict(districtName)
        const districtInfo = districtCoordinates[districtName]
        if (districtInfo) {
            setSearchQuery(districtInfo.bengali + ' (' + districtName.charAt(0).toUpperCase() + districtName.slice(1) + ')')
        }
        setFilteredDistricts([])
        setIsMobileSidebarOpen(true)
    }


    const selectedDistrictInfo = selectedDistrict ? districtCoordinates[selectedDistrict] : null
    const selectedDistrictNews = selectedDistrict ? (newsByDistrict[selectedDistrict] || []) : []


    const totalNewsCount = Object.values(newsByDistrict).reduce((sum, articles) => sum + articles.length, 0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">SARA DESH</h1>
                    <p className="text-lg opacity-90">সারা দেশ - Explore District-wise News from Bangladesh</p>
                </div>
            </section>

            {/* Search Bar - Sticky with green Search button */}
            <section className="bg-white border-b shadow-md py-6 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-2xl mx-auto relative">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search by district..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-full focus:border-green-500 focus:outline-none transition-all shadow-sm"
                                />

                                {/* Autocomplete Dropdown with district suggestions from static list */}
                                {filteredDistricts.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
                                        {filteredDistricts.map((district) => {
                                            const newsCount = newsByDistrict[district.name]?.length || 0
                                            const hasNews = districtsWithNews.includes(district.name)

                                            return (
                                                <button
                                                    key={district.name}
                                                    onClick={() => handleDistrictSelect(district.name)}
                                                    className="w-full text-left px-4 py-3 hover:bg-green-500 hover:text-white transition-colors border-b last:border-b-0 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <span className="font-semibold capitalize">{district.name}</span>
                                                        <span className="text-sm opacity-75 ml-2">{district.bengali}</span>
                                                        <span className="text-xs opacity-60 ml-2">({district.division})</span>
                                                    </div>
                                                    {hasNews && (
                                                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                                                            🔵 {newsCount} news
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            {/* Green Search button */}
                            <button
                                onClick={() => {
                                    if (searchQuery) {
                                        const foundDistrict = bangladeshDistricts.find(d =>
                                            d.name.toLowerCase() === searchQuery.toLowerCase() ||
                                            d.bengali === searchQuery
                                        )
                                        if (foundDistrict) {
                                            handleDistrictSelect(foundDistrict.name)
                                        }
                                    }
                                }}
                                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Real-time stats from API data */}
                    <div className="max-w-2xl mx-auto mt-4 flex justify-center gap-6 text-sm text-gray-600">
                        <span>📍 {allDistricts.length} Districts</span>
                        <span>📰 {totalNewsCount} News Articles</span>
                        <span>🔵 {districtsWithNews.length} Districts Covered</span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Map Section - Full width with blue markers only on districts with news */}
                        <div className="lg:col-span-2">
                            {isLoading ? (
                                <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-4"></div>
                                        <p className="text-gray-600">Loading map data...</p>
                                    </div>
                                </div>
                            ) : (
                                <BangladeshMap
                                    districtCoordinates={districtCoordinates}
                                    newsData={newsByDistrict}
                                    selectedDistrict={selectedDistrict}
                                    onMarkerClick={handleDistrictSelect}
                                />
                            )}

                            {/* Instructions */}
                            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                                <p className="text-sm text-blue-900">
                                    <strong>💡 How to use:</strong> Click on blue markers to view district news, or use the search bar above to find a specific district. Blue markers indicate districts with available news.
                                </p>
                            </div>
                        </div>

                        {/* FIXED: Right Sidebar with red "SARA DESH" title as per reference screenshot */}
                        <div className={`lg:block ${isMobileSidebarOpen ? 'block' : 'hidden'}`}>
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-[180px]">
                                <div className="border-b pb-4 mb-4">
                                    {/* FIXED: Big red "SARA DESH" title */}
                                    <h2 className="text-2xl font-bold text-red-600 mb-2">SARA DESH</h2>
                                    {selectedDistrictInfo ? (
                                        <>
                                            {/* FIXED: Bengali + English district name */}
                                            <p className="text-xl font-bold text-gray-900">
                                                {selectedDistrictInfo.bengali}
                                            </p>
                                            <p className="text-sm text-gray-600 capitalize">
                                                {selectedDistrict} ({selectedDistrictInfo.division} Division)
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-600">Select a district to view news</p>
                                    )}
                                </div>

                                {/* FIXED: Short description text */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        To spotlight development, challenges, and opportunities, the Sara Desh page curates stories from local readers and correspondents across Bangladesh.
                                    </p>
                                </div>

                                {/* FIXED: Sample news teasers from real API data (3-5 articles) */}
                                {selectedDistrict && selectedDistrictNews.length > 0 ? (
                                    <>
                                        <div className="mb-4">
                                            <h3 className="font-bold text-lg mb-3 text-gray-900 flex items-center justify-between">
                                                DISTRICT NEWS COVERAGE
                                                <span className="text-sm font-normal text-gray-600">
                                                    {selectedDistrictNews.length} articles
                                                </span>
                                            </h3>
                                        </div>

                                        {/* FIXED: News Cards with real data from API */}
                                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                            {selectedDistrictNews.slice(0, 5).map((news) => (
                                                <article key={news._id} className="border-b pb-4 last:border-b-0 hover:bg-gray-50 p-2 rounded transition-colors">
                                                    <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={news.imageUrl}
                                                            alt={news.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <h4 className="font-bold text-sm mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                                        <Link href={`/news/${news.category}/${news._id}`}>
                                                            {news.title}
                                                        </Link>
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                                        <span className="px-2 py-1 bg-blue-500 text-white rounded capitalize">
                                                            {news.category}
                                                        </span>
                                                        <span>{news.views || 0} views</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(news.publishedAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </article>
                                            ))}
                                        </div>

                                        {/* FIXED: Link to full district page */}
                                        <div className="mt-6 pt-4 border-t">
                                            <Link
                                                href={`/saradesh/${selectedDistrict}`}
                                                className="block w-full text-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                                            >
                                                View All Stories →
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-3">🗺️</div>
                                        <p className="text-gray-600 text-sm">
                                            {selectedDistrict
                                                ? 'No news articles from this district yet.'
                                                : 'Select a district from the map or search to view news.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="lg:hidden fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg z-50"
            >
                {isMobileSidebarOpen ? '✕' : '📰'}
            </button>
        </div>
    )
}
