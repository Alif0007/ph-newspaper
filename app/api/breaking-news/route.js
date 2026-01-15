// API endpoint: GET /api/breaking-news
// Returns latest breaking/trending news articles
// Query params: ?limit=5 (default: 5)

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '5')

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        // Fetch latest breaking news (sorted by views and recent publishedAt)
        const breakingNews = await collection
            .find({
                breaking: true
            })
            .sort({
                publishedAt: -1,
                views: -1
            })
            .limit(limit)
            .toArray()

        // If no breaking news, return most viewed recent articles
        if (breakingNews.length === 0) {
            const recentPopular = await collection
                .find({})
                .sort({
                    views: -1,
                    publishedAt: -1
                })
                .limit(limit)
                .toArray()

            return NextResponse.json({
                success: true,
                articles: recentPopular,
                isBreaking: false
            })
        }

        return NextResponse.json({
            success: true,
            articles: breakingNews,
            isBreaking: true
        })
    } catch (error) {
        console.error('Error fetching breaking news:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch breaking news' },
            { status: 500 }
        )
    }
}
