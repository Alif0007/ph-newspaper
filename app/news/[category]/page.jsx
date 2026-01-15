

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { getArticles } from '@/lib/api'

const categories = ['all', 'news', 'politics', 'sports', 'business', 'entertainment', 'technology', 'health']

export default function CategoryPage({ params }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const category = params.category || 'all'

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalArticles, setTotalArticles] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // FIXED: Get sort and page from URL params
    const sortBy = searchParams.get('sort') || 'newest'
    const currentPage = parseInt(searchParams.get('page') || '1')

    // FIXED: Fetch articles from API with filters
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true)
            try {
                const data = await getArticles({
                    category: category === 'all' ? undefined : category,
                    sort: sortBy,
                    page: currentPage,
                    limit: 12
                })

                setArticles(data.articles || [])
                setTotalArticles(data.pagination?.total || 0)
                setTotalPages(data.pagination?.totalPages || 0)
            } catch (error) {
                console.error('Error fetching articles:', error)
                setArticles([])
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [category, sortBy, currentPage])

    // FIXED: Update URL params when sort changes
    const handleSortChange = (newSort) => {
        const params = new URLSearchParams()
        params.set('sort', newSort)
        params.set('page', '1')
        router.push(`/news/${category}?${params.toString()}`)
    }

    // FIXED: Update URL params when page changes
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams()
        if (sortBy !== 'newest') params.set('sort', sortBy)
        params.set('page', newPage)
        router.push(`/news/${category}?${params.toString()}`)
    }

    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Category Header */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm mb-4 opacity-90">
                        <Link href="/" className="hover:text-gray-200 transition-colors">Home</Link>
                        <span>→</span>
                        <span>News</span>
                        <span>→</span>
                        <span>{categoryName}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryName} News</h1>
                    <p className="text-xl opacity-90">
                        {category === 'all' ? 'All the latest news from Bangladesh' : `Latest updates on ${categoryName.toLowerCase()} in Bangladesh`}
                    </p>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="bg-white border-b sticky top-[120px] z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={`/news/${cat}`}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${cat === category
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Controls */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {loading ? 'Loading...' : `${totalArticles} ${totalArticles === 1 ? 'Article' : 'Articles'}`}
                        </h2>
                        {/* FIXED: Sort dropdown with working onChange */}
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                        >
                            <option value="newest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
                            <p className="text-gray-600">Loading articles...</p>
                        </div>
                    ) : articles.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((article) => (
                                    <article key={article._id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift">
                                        <div className="relative h-48">
                                            <Image
                                                src={article.imageUrl}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="inline-block px-2 py-1 bg-accent text-white text-xs font-semibold rounded capitalize">
                                                    {article.category}
                                                </span>
                                                {article.views > 0 && (
                                                    <span className="text-xs text-gray-500">
                                                        👁️ {article.views.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                                <Link href={`/news/${article.category}/${article._id}`}>
                                                    {article.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {typeof article.content === 'string' ? article.content.substring(0, 120) + '...' : typeof article.title === 'string' ? article.title.substring(0, 120) + '...' : 'Read more...'}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                {article.district && (
                                                    <span className="capitalize">📍 {article.district}</span>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* FIXED: Pagination with working page change */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                            const pageNum = i + 1
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === pageNum
                                                        ? 'bg-primary text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            )
                                        })}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
                            <p className="text-gray-600 mb-6">Check back soon for updates in this category.</p>
                            <Link
                                href="/"
                                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}