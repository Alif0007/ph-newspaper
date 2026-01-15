export default function sitemap() {
    const baseUrl = 'https://phnewspaper.com'

    const categories = ['national', 'politics', 'sports', 'technology', 'education', 'business', 'all']

    // Static pages
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/saradesh`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]

    // Category pages
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }))

    // Sample article pages (1-14)
    const articlePages = Array.from({ length: 14 }, (_, i) => ({
        url: `${baseUrl}/article/${i + 1}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    return [...routes, ...categoryPages, ...articlePages]
}
