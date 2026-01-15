// API endpoint: GET /api/districts/:district/stats
// Returns category statistics for a specific district
// Used by district detail page for Recharts visualization
// Response: [{ category: 'news', count: 5 }, { category: 'sports', count: 3 }, ...]

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request, { params }) {
    try {
        const { district } = params

        if (!district) {
            return NextResponse.json(
                { success: false, error: 'District parameter is required' },
                { status: 400 }
            )
        }

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        // Aggregate articles by category for this district
        const stats = await collection.aggregate([
            {
                $match: {
                    district: district.toLowerCase()
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalViews: { $sum: '$views' }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    count: 1,
                    totalViews: 1
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray()

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Error fetching district stats:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch district statistics' },
            { status: 500 }
        )
    }
}
