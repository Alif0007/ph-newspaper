// API endpoint: GET /api/categories
// Returns all categories with article counts
// Used for category navigation and statistics

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request) {
    try {
        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        // Aggregate articles by category
        const categories = await collection.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalViews: { $sum: '$views' },
                    latestArticle: { $max: '$publishedAt' }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    count: 1,
                    totalViews: 1,
                    latestArticle: 1
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray()

        return NextResponse.json({
            success: true,
            categories
        })
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}
