import Link from 'next/link'

export const metadata = {
    title: '404 - Page Not Found | PH Newspaper',
    description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    <div className="text-6xl mb-4">📰❌</div>
                </div>

                {/* Error Message */}
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Here are some helpful links:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/"
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all hover-lift"
                        >
                            <span>🏠</span>
                            <span>Go to Homepage</span>
                        </Link>
                        <Link
                            href="/saradesh"
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-all hover-lift"
                        >
                            <span>🗺️</span>
                            <span>Visit Sara Desh</span>
                        </Link>
                        <Link
                            href="/category/national"
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all hover-lift"
                        >
                            <span>📢</span>
                            <span>National News</span>
                        </Link>
                        <Link
                            href="/category/sports"
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all hover-lift"
                        >
                            <span>⚽</span>
                            <span>Sports News</span>
                        </Link>
                    </div>
                </div>

                {/* Popular Categories */}
                <div className="text-left bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Browse Popular Categories:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {['National', 'Politics', 'Sports', 'Technology', 'Education', 'Business'].map((category) => (
                            <Link
                                key={category}
                                href={`/category/${category.toLowerCase()}`}
                                className="px-4 py-2 bg-gray-100 hover:bg-accent hover:text-white text-gray-700 rounded-lg font-semibold transition-colors"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Search Suggestion */}
                <div className="mt-8 text-gray-600">
                    <p>
                        Need help? <Link href="/" className="text-primary hover:text-primary-dark font-semibold">Contact us</Link> or use the search feature to find what you are looking for.
                    </p>
                </div>
            </div>
        </div>
    )
}
