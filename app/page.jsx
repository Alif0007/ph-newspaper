

import { getArticles, getBreakingNews, getCategories } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
    // Fetch latest articles
    let latestArticlesData;
    try {
        latestArticlesData = await getArticles({
            sort: 'newest',
            limit: 12
        });
    } catch (error) {
        console.error('Error fetching latest articles:', error);
        latestArticlesData = { articles: [] };
    }

    // Fetch breaking news
    let breakingNews;
    try {
        breakingNews = await getBreakingNews(6);
    } catch (error) {
        console.error('Error fetching breaking news:', error);
        breakingNews = [];
    }

    // Fetch categories with counts
    let categoriesData;
    try {
        categoriesData = await getCategories();
    } catch (error) {
        console.error('Error fetching categories:', error);
        categoriesData = { categories: [] };
    }

    const latestArticles = latestArticlesData.articles || []
    const categories = categoriesData.categories || []

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breaking News Ticker */}
            {breakingNews && breakingNews.length > 0 && (
                <section className="bg-primary text-white py-3 border-b-2 border-primary-dark">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center gap-4">
                            <span className="bg-white text-primary px-3 py-1 rounded font-bold text-sm flex-shrink-0 animate-pulse">
                                🔴 BREAKING
                            </span>
                            <div className="overflow-hidden flex-1">
                                <div className="animate-marquee whitespace-nowrap">
                                    {breakingNews && breakingNews.length > 0 ? (
                                        breakingNews.map((news) => (
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

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">PH Newspaper</h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">Stay updated with the latest news from Bangladesh</p>
                    <Link
                        href="/news/all"
                        className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors text-lg"
                    >
                        Explore All News
                    </Link>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="bg-white border-b py-6 sticky top-[120px] z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <Link
                                key={cat.category}
                                href={`/news/${cat.category}`}
                                className="px-4 py-2 rounded-lg font-semibold transition-all bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                            >
                                {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)} ({cat.count})
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Articles</h2>

                    {latestArticles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestArticles.map((article) => (
                                <article key={article._id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift">
                                    <div className="relative h-48">
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {article.views > 5000 && (
                                            <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                                                🔥 Trending
                                            </span>
                                        )}
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
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📰</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
                            <p className="text-gray-600">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Breaking News Section */}
            {breakingNews && breakingNews.length > 0 && (
                <section className="py-12 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
                            <span className="text-primary">⚡</span>
                            Breaking News
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {breakingNews.slice(0, 6).map((news) => (
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
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Overview */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">News by Category</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.slice(0, 8).map((cat) => (
                            <Link
                                key={cat.category}
                                href={`/news/${cat.category}`}
                                className="bg-white rounded-lg p-6 shadow-md hover-lift border border-gray-200 text-center"
                            >
                                <div className="text-4xl mb-4">
                                    {cat.category === 'news' && '📰'}
                                    {cat.category === 'politics' && '🏛️'}
                                    {cat.category === 'sports' && '⚽'}
                                    {cat.category === 'business' && '💼'}
                                    {cat.category === 'entertainment' && '🎭'}
                                    {cat.category === 'technology' && '💻'}
                                    {cat.category === 'health' && '🏥'}
                                    {(cat.category === 'education' || cat.category === 'environment') && '🌍'}
                                    {!['news', 'politics', 'sports', 'business', 'entertainment', 'technology', 'health', 'education', 'environment'].includes(cat.category) && '📋'}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900 capitalize">
                                    {cat.category}
                                </h3>
                                <p className="text-gray-600">{cat.count} articles</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}