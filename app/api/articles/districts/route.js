// API endpoint: GET /api/articles/districts
// Returns list of districts that have at least one article
// Used by Sara Desh map to show blue markers only on districts with news

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request) {
    try {
        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        // Get distinct districts that have articles
        const districts = await collection.distinct('district', {
            district: { $exists: true, $ne: null, $ne: '' }
        })

        // Sort alphabetically
        districts.sort()

        return NextResponse.json(districts)
    } catch (error) {
        console.error('Error fetching districts with news:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch districts' },
            { status: 500 }
        )
    }
}
