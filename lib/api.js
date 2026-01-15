
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'


export async function getArticleById(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
            cache: 'no-store', // FIXED: Ensures views increment on each visit
            next: { revalidate: 0 }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch article: ${res.statusText}`)
        }
        const data = await res.json()
        console.log('Article fetched successfully')
        return data.article
    } catch (error) {
        console.error('Error fetching article:', error)
        return null
    }
}


export async function getArticles({ category, sort, page = 1, limit = 10, district } = {}) {
    try {
        const params = new URLSearchParams()

        if (category && category !== 'all') {
            params.append('category', category)
        }

        if (sort) {
            // Convert sort option to API format
            // 'newest' -> 'publishedAt-desc'
            // 'oldest' -> 'publishedAt-asc'
            // 'popular' -> 'views-desc'
            const sortMap = {
                'newest': 'publishedAt-desc',
                'oldest': 'publishedAt-asc',
                'popular': 'views-desc'
            }
            params.append('sort', sortMap[sort] || sort)
        }

        if (district) {
            params.append('district', district)
        }

        params.append('page', page)
        params.append('limit', limit)

        const res = await fetch(`${API_BASE_URL}/api/articles?${params.toString()}`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch articles: ${res.statusText}`)
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching articles:', error)
        return { articles: [], total: 0, page: 1, totalPages: 0 }
    }
}


export async function getDistrictsWithNews() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/articles/districts`, {
            cache: 'no-store',
            next: { revalidate: 60 } // Cache for 1 minute
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch districts: ${res.statusText}`)
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching districts:', error)
        return []
    }
}


export async function getDistrictStats(district) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/districts/${district}/stats`, {
            cache: 'no-store',
            next: { revalidate: 300 } // Cache for 5 minutes
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch district stats: ${res.statusText}`)
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching district stats:', error)
        return []
    }
}


export async function getBreakingNews(limit = 5) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/articles?sort=publishedAt-desc&limit=${limit}&breaking=true`, {
            cache: 'no-store',
            next: { revalidate: 60 }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch breaking news: ${res.statusText}`)
        }

        const data = await res.json()
        return data.articles || []
    } catch (error) {
        console.error('Error fetching breaking news:', error)
        return []
    }
}


export async function getCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/categories`, {
            cache: 'no-store',
            next: { revalidate: 300 } // Cache for 5 minutes
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.statusText}`)
        }

        const data = await res.json()
        return data.categories || []
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { categories: [] }
    }
}
