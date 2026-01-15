import Image from 'next/image'
import Link from 'next/link'

const categories = ['national', 'politics', 'sports', 'technology', 'education', 'business', 'all']

// Sample articles database by category
const articlesByCategory = {
    'national': [
        { id: 1, title: 'Breaking: Major Development Initiative Announced for Rural Bangladesh', excerpt: 'Government unveils comprehensive plan to boost infrastructure and connectivity in rural districts', category: 'National', image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400', date: 'January 13, 2026' },
        { id: 6, title: 'National Budget 2026: Focus on Digital Infrastructure', excerpt: 'Finance Minister announces record allocation for technology sector', category: 'National', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', date: 'January 10, 2026' },
        { id: 7, title: 'Census 2026: Bangladesh Population Reaches 175 Million', excerpt: 'Latest population data reveals significant urbanization trends', category: 'National', image: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400', date: 'January 9, 2026' },
    ],
    'politics': [
        { id: 8, title: 'Parliament Passes Landmark Digital Rights Legislation', excerpt: 'New law aims to protect citizen privacy and data security', category: 'Politics', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400', date: 'January 12, 2026' },
        { id: 9, title: 'Local Government Elections Scheduled for March 2026', excerpt: 'Election Commission announces dates for upazila council polls', category: 'Politics', image: 'https://images.unsplash.com/photo-1495556650867-99590cea3657?w=400', date: 'January 11, 2026' },
    ],
    'sports': [
        { id: 4, title: 'Bangladesh Cricket Team Wins Series Against Sri Lanka', excerpt: 'Historic victory marks a turning point for Bangladesh cricket on the international stage', category: 'Sports', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400', date: 'January 12, 2026' },
        { id: 10, title: 'Dhaka to Host South Asian Football Championship 2027', excerpt: 'Bangladesh awarded hosting rights for regional tournament', category: 'Sports', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', date: 'January 10, 2026' },
    ],
    'technology': [
        { id: 5, title: 'Tech Startups Boom: Dhaka Emerges as South Asian Hub', excerpt: 'Investment in local tech companies reaches record high, attracting international attention', category: 'Technology', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', date: 'January 11, 2026' },
        { id: 11, title: '5G Network Launch: Major Telecom Operators Roll Out Service', excerpt: 'High-speed mobile internet now available in major cities', category: 'Technology', image: 'https://images.unsplash.com/photo-1551817958-20e48f2ee69c?w=400', date: 'January 9, 2026' },
    ],
    'education': [
        { id: 3, title: 'Education Reform: Digital Classrooms in All Upazila Schools', excerpt: 'Ministry of Education launches initiative to digitize education across rural Bangladesh', category: 'Education', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', date: 'January 12, 2026' },
        { id: 12, title: 'New University Ranking: Dhaka University in Top 500 Globally', excerpt: 'Bangladeshi universities show improvement in international standings', category: 'Education', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', date: 'January 8, 2026' },
    ],
    'business': [
        { id: 13, title: 'Stock Market Hits All-Time High on Economic Optimism', excerpt: 'DSE index crosses 8000 mark as investors show confidence', category: 'Business', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', date: 'January 13, 2026' },
        { id: 14, title: 'Export Earnings Grow 15% in Fiscal Year 2025-26', excerpt: 'RMG sector leads growth with record international orders', category: 'Business', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', date: 'January 10, 2026' },
    ],
}

// Get all articles for "all" category
const allArticles = Object.values(articlesByCategory).flat()

export async function generateMetadata({ params }) {
    const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

    return {
        title: `${categoryName} News | PH Newspaper`,
        description: `Latest ${categoryName} news from Bangladesh. Stay updated with comprehensive coverage.`,
        keywords: `Bangladesh ${categoryName}, ${categoryName} news, PH Newspaper`,
        openGraph: {
            title: `${categoryName} News | PH Newspaper`,
            description: `Latest ${categoryName} news from Bangladesh`,
            type: 'website',
        },
    }
}

export default function CategoryPage({ params }) {
    const category = params.category
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    const articles = category === 'all' ? allArticles : (articlesByCategory[category] || [])

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Category Header */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm mb-4 opacity-90">
                        <Link href="/" className="hover:text-gray-200 transition-colors">Home</Link>
                        <span>→</span>
                        <span>Categories</span>
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
                                href={`/category/${cat}`}
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
                    {articles.length > 0 ? (
                        <>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                                </h2>
                                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors">
                                    <option>Latest First</option>
                                    <option>Oldest First</option>
                                    <option>Most Popular</option>
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((article) => (
                                    <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift">
                                        <div className="relative h-48">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <span className="inline-block px-2 py-1 bg-accent text-white text-xs font-semibold rounded mb-2">
                                                {article.category}
                                            </span>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                                <Link href={`/article/${article.id}`}>
                                                    {article.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                            <p className="text-xs text-gray-500">{article.date}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                        Previous
                                    </button>
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg">
                                        1
                                    </button>
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                        2
                                    </button>
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                        3
                                    </button>
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                        Next
                                    </button>
                                </div>
                            </div>
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

export function generateStaticParams() {
    return categories.map((category) => ({
        category: category,
    }))
}
