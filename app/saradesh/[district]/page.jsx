'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const COLORS = ['#DC2626', '#16A34A', '#2563EB', '#9333EA', '#EA580C', '#0891B2', '#CA8A04']

export default function DistrictDetailPage() {
    const params = useParams()
    const district = params.district

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [currentPage, setCurrentPage] = useState(1)
    const [articles, setArticles] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [stats, setStats] = useState({ total: 0, totalViews: 0 })
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 9

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {

                const articlesRes = await fetch(`${API_BASE_URL}/articles?district=${district}&category=${selectedCategory !== 'all' ? selectedCategory : ''}&sort=${sortBy === 'newest' ? 'publishedAt-desc' : sortBy === 'oldest' ? 'publishedAt-asc' : 'views-desc'}&page=${currentPage}&limit=${itemsPerPage}`)
                const articlesData = await articlesRes.json()
                setArticles(articlesData.articles || [])


                const statsRes = await fetch(`${API_BASE_URL}/districts/${district}/stats`)
                const statsData = await statsRes.json()

                const chartData = statsData.map(item => ({
                    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
                    value: item.count,
                    count: item.count
                }))
                setCategoryData(chartData)


                const total = statsData.reduce((sum, item) => sum + item.count, 0)
                const totalViews = statsData.reduce((sum, item) => sum + item.totalViews, 0)
                setStats({ total, totalViews })


                const categoriesRes = await fetch(`${API_BASE_URL}/categories`)
                const categoriesData = await categoriesRes.json()
                setCategories(['all', ...categoriesData.categories.map(cat => cat.category)])
            } catch (error) {
                console.error('Error fetching district data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [district, selectedCategory, sortBy, currentPage])


    const totalPages = Math.ceil(stats.total / itemsPerPage)
    const paginatedNews = articles

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-4"></div>
                    <p className="text-gray-600">Loading district data...</p>
                </div>
            </div>
        )
    }


    const districtInfo = {
        'dhaka': { bengali: 'ঢাকা', division: 'Dhaka', lat: 23.8103, lng: 90.4125 },
        'chittagong': { bengali: 'চট্টগ্রাম', division: 'Chittagong', lat: 22.3569, lng: 91.7832 },
        'sylhet': { bengali: 'সিলেট', division: 'Sylhet', lat: 24.8949, lng: 91.8687 },
        'rajshahi': { bengali: 'রাজশাহী', division: 'Rajshahi', lat: 24.3745, lng: 88.6042 },
        'khulna': { bengali: 'খুলনা', division: 'Khulna', lat: 22.8456, lng: 89.5403 },
        'barisal': { bengali: 'বরিশাল', division: 'Barisal', lat: 22.7010, lng: 90.3535 },
        'rangpur': { bengali: 'রংপুর', division: 'Rangpur', lat: 25.7439, lng: 89.2752 },
        'mymensingh': { bengali: 'ময়মনসিংহ', division: 'Mymensingh', lat: 24.7471, lng: 90.4203 },

    }[district.toLowerCase()] || { bengali: district, division: 'Unknown', lat: 0, lng: 0 }

    if (!districtInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">District Not Found</h1>
                    <Link href="/saradesh" className="text-primary hover:underline">
                        ← Back to Sara Desh
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-4">
                        <Link href="/saradesh" className="text-white hover:text-gray-200 text-sm">
                            ← Back to Sara Desh
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        {districtInfo.bengali}
                    </h1>
                    <p className="text-xl opacity-90 capitalize">
                        {district} District, {districtInfo.division} Division
                    </p>
                    <div className="flex gap-4 mt-4 text-sm">
                        <span className="px-3 py-1 bg-white/20 rounded">
                            📰 {stats.total} News Articles
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded">
                            👁️ {stats.totalViews.toLocaleString()} Total Views
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded">
                            📊 {categoryData.length} Categories
                        </span>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">News Distribution by Category</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Bar Chart */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Articles per Category</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#16A34A" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Category Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters & Sorting */}
            <section className="py-6 bg-gray-100 sticky top-[120px] z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <label className="font-semibold text-gray-700">Category:</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-accent focus:outline-none bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="capitalize">
                                        {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <label className="font-semibold text-gray-700">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-accent focus:outline-none bg-white"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-gray-600">
                            Showing {articles.length} of {stats.total} articles
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {articles.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((news) => (
                                    <article key={news._id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift">
                                        <div className="relative h-48">
                                            <Image
                                                src={news.imageUrl}
                                                alt={news.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="inline-block px-2 py-1 bg-accent text-white text-xs font-semibold rounded capitalize">
                                                    {news.category}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {news.views?.toLocaleString() || 0} views
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                                <Link href={`/news/${news.category}/${news._id}`}>
                                                    {news.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {news.content?.substring(0, 100) || news.title.substring(0, 100)}...
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{new Date(news.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                <span className="capitalize">{news.division}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(pageNum => (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === pageNum
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📰</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h2>
                            <p className="text-gray-600 mb-6">
                                Try selecting a different category or filter.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all')
                                    setSortBy('newest')
                                    setCurrentPage(1)
                                }}
                                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
