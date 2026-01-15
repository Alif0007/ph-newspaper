'use client'

export default function Error({ error, reset }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-xl w-full text-center bg-white rounded-lg shadow-lg p-8">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Something went wrong!
                </h2>
                <p className="text-gray-600 mb-6">
                    {error?.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    )
}
