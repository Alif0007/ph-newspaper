export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
                <p className="text-gray-600">Please wait while we load the content</p>
            </div>
        </div>
    )
}
