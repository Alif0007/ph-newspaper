

import Image from 'next/image'
import Link from 'next/link'
import { getArticleById, getArticles, getBreakingNews } from '@/lib/api'
import { notFound } from 'next/navigation'

// FIXED: Server Component that fetches data with no-store cache
export default async function ArticlePage({ params }) {
    const { category, id } = params

    // FIXED: Fetch article with auto-increment views (no-store cache)
    const article = await getArticleById(id)

    if (!article) {
        notFound()
    }

    // FIXED: Fetch related articles from same category via API
    const relatedData = await getArticles({
        category: article.category,
        sort: 'popular',
        limit: 6
    })

    // Filter out current article from related
    const relatedArticles = relatedData.articles?.filter(a => a._id !== id) || []

    // FIXED: Fetch breaking news from API
    const breakingNews = await getBreakingNews(3)

    return (
        <div className="bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>→</span>
                        <Link href={`/news/${(article.category || '').toLowerCase()}`} className="hover:text-primary transition-colors">
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
                    <Link href={`/news/${(article.category || '').toLowerCase()}`}>
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
                            {article.author?.image && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={article.author.image}
                                        alt={article.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-gray-900">{article.author?.name || 'PH Newspaper'}</p>
                                <p className="text-sm text-gray-600">
                                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📖 {article.readTime || '5 min read'}</span>
                            <span>👁️ {article.views?.toLocaleString()} views</span>
                            <button className="hover:text-primary transition-colors" aria-label="Share article">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {article.imageUrl && (
                        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    {article.content ? (
                        <div
                            className="prose prose-lg max-w-none mb-8"
                            dangerouslySetInnerHTML={{ __html: typeof article.content === 'string' ? article.content : '' }}
                            style={{
                                fontSize: '1.125rem',
                                lineHeight: '1.8',
                                color: '#374151',
                            }}
                        />
                    ) : (
                        <div className="prose prose-lg max-w-none mb-8" style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.8',
                            color: '#374151',
                        }}>
                            {article.title}
                        </div>
                    )}

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
                            <span className="text-sm font-semibold text-gray-700 mr-2">Tags:</span>
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/news/${(tag || '').toLowerCase()}`}
                                    className="px-3 py-1 bg-gray-200 hover:bg-accent hover:text-white text-gray-700 text-sm rounded-full transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}

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
            {breakingNews.length > 0 && (
                <section className="bg-primary text-white py-3 border-y-2 border-primary-dark">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center gap-4">
                            <span className="bg-white text-primary px-3 py-1 rounded font-bold text-sm flex-shrink-0 animate-pulse">
                                🔴 BREAKING
                            </span>
                            <div className="overflow-hidden flex-1">
                                <div className="animate-marquee whitespace-nowrap">
                                    {breakingNews && breakingNews.length > 0 ? (
                                        breakingNews.map((news, index) => (
                                            <Link
                                                key={news._id}
                                                href={`/news/${news.category}/${news._id}`}
                                                className="inline-block mx-8 hover:text-gray-200 transition-colors"
                                            >
                                                <span className="font-semibold">{news.title}</span>
                                                <span className="mx-2">•</span>
                                            </Link>
                                        ))
                                    ) : (
                                        <span>No breaking news at the moment</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Related Articles from Same Category */}
            {relatedArticles.length > 0 && (
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                More from <span className="text-primary">{article.category}</span>
                            </h2>
                            <Link
                                href={`/news/${(article.category || '').toLowerCase()}`}
                                className="text-primary font-semibold hover:text-primary-dark transition-colors"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.slice(0, 6).map((related) => (
                                <article key={related._id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift border border-gray-200">
                                    <div className="relative h-48">
                                        <Image
                                            src={related.imageUrl}
                                            alt={related.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {related.views > 5000 && (
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
                                            {related.views > 0 && (
                                                <span className="text-xs text-gray-500">
                                                    👁️ {related.views.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                            <Link href={`/news/${(related.category || '').toLowerCase()}/${related._id}`}>
                                                {related.title}
                                            </Link>
                                        </h3>
                                        {related.content && (
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                {typeof related.content === 'string' ? related.content.substring(0, 100) + '...' : typeof related.title === 'string' ? related.title.substring(0, 100) + '...' : 'Read more...'}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{new Date(related.publishedAt).toLocaleDateString()}</span>
                                            {related.district && (
                                                <span className="capitalize">📍 {related.district}</span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Breaking News Section */}
            {breakingNews.length > 0 && (
                <section className="py-12 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
                            <span className="text-primary">⚡</span>
                            Breaking News
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {breakingNews && breakingNews.length > 0 ? (
                                breakingNews.map((news) => (
                                    <article key={news._id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift border-2 border-primary">
                                        <div className="relative h-48">
                                            <Image
                                                src={news.imageUrl}
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
                                                <Link href={`/news/${news.category}/${news._id}`}>
                                                    {news.title}
                                                </Link>
                                            </h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                                <span>📅 {new Date(news.publishedAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className="text-primary font-semibold">Just Now</span>
                                            </p>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12">
                                    <p className="text-gray-500">No breaking news at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

