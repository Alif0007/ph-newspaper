// API utility for fetching data from Next.js API routes
// Base URL - change to production URL when deploying
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

/**
 * Fetch article by ID and auto-increment views
 * FIXED: Using no-store cache to ensure fresh data on every visit
 */
export async function getArticleById(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
            cache: 'no-store', // FIXED: Ensures views increment on each visit
            next: { revalidate: 0 }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch article: ${res.statusText}`)
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching article:', error)
        return null
    }
}

/**
 * Fetch articles with filtering, sorting, and pagination
 * FIXED: Properly constructs query params for category filter and sort
 */
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

        const res = await fetch(`${API_BASE_URL}/articles?${params.toString()}`, {
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

/**
 * Fetch districts that have news articles
 * Used for map markers
 */
export async function getDistrictsWithNews() {
    try {
        const res = await fetch(`${API_BASE_URL}/articles/districts`, {
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

/**
 * Fetch district statistics for charts
 * FIXED: Uses real API endpoint instead of fake data
 */
export async function getDistrictStats(district) {
    try {
        const res = await fetch(`${API_BASE_URL}/districts/${district}/stats`, {
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

/**
 * Fetch breaking news
 */
export async function getBreakingNews(limit = 5) {
    try {
        const res = await fetch(`${API_BASE_URL}/breaking-news?limit=${limit}`, {
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

/**
 * Fetch categories with article counts
 */
export async function getCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/categories`, {
            cache: 'no-store',
            next: { revalidate: 300 } // Cache for 5 minutes
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.statusText}`)
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { categories: [] }
    }
}