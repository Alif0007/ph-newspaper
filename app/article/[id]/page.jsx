'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sampleNews } from '@/lib/newsData'

// Sample article database
const articles = {
    '1': {
        id: 1,
        title: 'Breaking: Major Development Initiative Announced for Rural Bangladesh',
        content: `
      <p>In a historic announcement, the government has unveiled a comprehensive development initiative aimed at transforming rural Bangladesh. The multi-billion taka program focuses on infrastructure development, digital connectivity, and economic opportunities in districts across the nation.</p>
      
      <h2>Key Highlights of the Initiative</h2>
      <p>The ambitious program includes several major components:</p>
      <ul>
        <li>Construction of 5,000 kilometers of new rural roads</li>
        <li>High-speed internet connectivity to all upazilas</li>
        <li>Establishment of 100 new technical training centers</li>
        <li>Agricultural modernization and support programs</li>
      </ul>
      
      <h2>Economic Impact</h2>
      <p>Economists predict that this initiative will create over 500,000 new jobs and boost rural GDP by 15% over the next five years. The focus on infrastructure and connectivity is expected to attract both domestic and foreign investment to previously underserved areas.</p>
      
      <h2>Implementation Timeline</h2>
      <p>The government has announced a phased implementation approach, with the first phase beginning in the current fiscal year. Priority districts have been identified based on development needs and potential for economic growth.</p>
      
      <p>Local leaders and development organizations have welcomed the announcement, calling it a "game-changer" for rural Bangladesh. The initiative aligns with the country's vision of becoming a developed nation by 2041.</p>
    `,
        category: 'National',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200',
        date: 'January 13, 2026',
        author: 'Rahman Ahmed',
        authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        readTime: '5 min read',
        tags: ['Development', 'Infrastructure', 'Rural', 'Economy'],
    },
    '2': {
        id: 2,
        title: 'Dhaka Metro Rail Expansion: New Routes to Be Added by 2027',
        content: `
      <p>Transportation authorities have confirmed ambitious plans to expand Dhaka's metro rail system with three additional lines by 2027. This expansion will significantly improve urban mobility and reduce traffic congestion in the capital.</p>
      
      <h2>New Metro Lines</h2>
      <p>The expansion includes:</p>
      <ul>
        <li>Line MRT-2: Gabtoli to Chattogram Road</li>
        <li>Line MRT-4: Kamalapur to Narayanganj</li>
        <li>Line MRT-5: Gazipur to Hemayetpur</li>
      </ul>
      
      <p>These new lines will integrate seamlessly with the existing MRT-6 line, creating a comprehensive rapid transit network that serves major residential and commercial areas of Greater Dhaka.</p>
    `,
        category: 'Transportation',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200',
        date: 'January 13, 2026',
        author: 'Fatima Khan',
        authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        readTime: '4 min read',
        tags: ['Metro Rail', 'Transportation', 'Dhaka', 'Infrastructure'],
    },
}

// Breaking news (most recent and high-priority articles)
const breakingNews = [
    {
        id: 1,
        title: 'Breaking: Major Development Initiative Announced for Rural Bangladesh',
        category: 'National',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400',
        date: 'January 13, 2026',
        isBreaking: true,
    },
    {
        id: 2,
        title: 'Dhaka Metro Rail Expansion: New Routes to Be Added by 2027',
        category: 'Transportation',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        date: 'January 13, 2026',
        isBreaking: true,
    },
    {
        id: 101,
        title: 'Dhaka Metro Rail Phase 2 Construction Begins',
        category: 'Transportation',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        date: 'January 13, 2026',
        isBreaking: true,
    },
]

// Function to get related articles from the same category
function getRelatedArticles(currentArticleId, category, limit = 6) {
    // Combine articles and sampleNews
    const allArticles = [
        ...Object.values(articles),
        ...sampleNews
    ]

    // Filter by same category, exclude current article
    const related = allArticles.filter(article => {
        const articleId = article.id?.toString() || article._id?.toString()
        return articleId !== currentArticleId &&
            (article.category?.toLowerCase() === category?.toLowerCase())
    })

    // Sort by views (popularity) and date
    related.sort((a, b) => {
        const viewsA = a.views || 0
        const viewsB = b.views || 0
        if (viewsB !== viewsA) return viewsB - viewsA
        return new Date(b.publishedAt || b.date) - new Date(a.publishedAt || a.date)
    })

    return related.slice(0, limit)
}

// Function to increment view count
function incrementViewCount(articleId) {
    // In production, this would be an API call to update the database
    // For now, we'll use localStorage to track views
    if (typeof window !== 'undefined') {
        const viewKey = `article_view_${articleId}`
        const lastView = localStorage.getItem(viewKey)
        const now = Date.now()

        // Only increment if it's been more than 1 hour since last view
        if (!lastView || (now - parseInt(lastView)) > 3600000) {
            localStorage.setItem(viewKey, now.toString())

            // In production: make API call
            // fetch(`/api/articles/${articleId}/increment-view`, { method: 'POST' })
            console.log(`View count incremented for article ${articleId}`)
            return true
        }
    }
    return false
}



export default function ArticlePage({ params }) {
    const article = articles[params.id] || articles['1']
    const [viewCount, setViewCount] = useState(article.views || 0)
    const [hasIncrementedView, setHasIncrementedView] = useState(false)

    // Get related articles from same category
    const relatedArticles = getRelatedArticles(
        params.id,
        article.category,
        6
    )

    // Track view count on component mount
    useEffect(() => {
        if (!hasIncrementedView) {
            const incremented = incrementViewCount(params.id)
            if (incremented) {
                setViewCount(prev => prev + 1)
            }
            setHasIncrementedView(true)
        }
    }, [params.id, hasIncrementedView])

    return (
        <div className="bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>→</span>
                        <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-primary transition-colors">
                            {article.category}
                        </Link>
                        <span>→</span>
                        <span className="text-gray-900">Article</span>
                    </div>
                </div>
            </div>

            {/* Article Header */}
            <article className="bg-white py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Category Badge */}
                    <Link href={`/category/${article.category.toLowerCase()}`}>
                        <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-4 hover:bg-primary-dark transition-colors cursor-pointer">
                            {article.category}
                        </span>
                    </Link>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                        {article.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-6 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                    src={article.authorImage}
                                    alt={article.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{article.author}</p>
                                <p className="text-sm text-gray-600">{article.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📖 {article.readTime}</span>
                            <span>👁️ {viewCount.toLocaleString()} views</span>
                            <button className="hover:text-primary transition-colors" aria-label="Share article">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Article Content */}
                    <div
                        className="prose prose-lg max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.8',
                            color: '#374151',
                        }}
                    />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
                        <span className="text-sm font-semibold text-gray-700 mr-2">Tags:</span>
                        {article.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/category/${tag.toLowerCase()}`}
                                className="px-3 py-1 bg-gray-200 hover:bg-accent hover:text-white text-gray-700 text-sm rounded-full transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    {/* Share Section */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h3 className="font-bold text-lg mb-4">Share this article</h3>
                        <div className="flex space-x-4">
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                Facebook
                            </button>
                            <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors">
                                Twitter
                            </button>
                            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Breaking News Ticker */}
            <section className="bg-primary text-white py-3 border-y-2 border-primary-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <span className="bg-white text-primary px-3 py-1 rounded font-bold text-sm flex-shrink-0 animate-pulse">
                            🔴 BREAKING
                        </span>
                        <div className="overflow-hidden flex-1">
                            <div className="animate-marquee whitespace-nowrap">
                                {breakingNews.map((news, index) => (
                                    <Link
                                        key={news.id}
                                        href={`/article/${news.id}`}
                                        className="inline-block mx-8 hover:text-gray-200 transition-colors"
                                    >
                                        <span className="font-semibold">{news.title}</span>
                                        <span className="mx-2">•</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles from Same Category */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            More from <span className="text-primary">{article.category}</span>
                        </h2>
                        <Link
                            href={`/category/${article.category.toLowerCase()}`}
                            className="text-primary font-semibold hover:text-primary-dark transition-colors"
                        >
                            View All →
                        </Link>
                    </div>
                    {relatedArticles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => {
                                const articleId = related.id || related._id
                                const articleImage = related.image || related.imageUrl
                                const articleDate = related.date || new Date(related.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                const articleViews = related.views || 0

                                return (
                                    <article key={articleId} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift border border-gray-200">
                                        <div className="relative h-48">
                                            <Image
                                                src={articleImage}
                                                alt={related.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {articleViews > 5000 && (
                                                <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                                                    🔥 Trending
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="inline-block px-2 py-1 bg-accent text-white text-xs font-semibold rounded capitalize">
                                                    {related.category}
                                                </span>
                                                {articleViews > 0 && (
                                                    <span className="text-xs text-gray-500">
                                                        👁️ {articleViews.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                                <Link href={`/article/${articleId}`}>
                                                    {related.title}
                                                </Link>
                                            </h3>
                                            {related.content && (
                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                    {related.content.substring(0, 100)}...
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{articleDate}</span>
                                                {related.district && (
                                                    <span className="capitalize">📍 {related.district}</span>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">No related articles found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Breaking News Section */}
            <section className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
                        <span className="text-primary">⚡</span>
                        Breaking News
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {breakingNews.map((news) => (
                            <article key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift border-2 border-primary">
                                <div className="relative h-48">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                        🔴 LIVE
                                    </span>
                                </div>
                                <div className="p-5">
                                    <span className="inline-block px-2 py-1 bg-primary text-white text-xs font-semibold rounded mb-2">
                                        {news.category}
                                    </span>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                        <Link href={`/article/${news.id}`}>
                                            {news.title}
                                        </Link>
                                    </h3>
                                    <p className="text-xs text-gray-500 flex items-center gap-2">
                                        <span>📅 {news.date}</span>
                                        <span>•</span>
                                        <span className="text-primary font-semibold">Just Now</span>
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
