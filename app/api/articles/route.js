// API endpoint: GET /api/articles
// Fetches articles with filtering, sorting, and pagination
// Query params: ?category=X&district=Y&sort=publishedAt-desc&page=1&limit=10

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)

        // Extract query parameters
        const category = searchParams.get('category')
        const district = searchParams.get('district')
        const sortParam = searchParams.get('sort') || 'publishedAt-desc'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        // Build MongoDB filter
        const filter = {}
        if (category && category !== 'all') {
            filter.category = category
        }
        if (district) {
            filter.district = district.toLowerCase()
        }

        // Build sort object
        const [sortField, sortOrder] = sortParam.split('-')
        const sort = {}
        sort[sortField] = sortOrder === 'desc' ? -1 : 1

        // Calculate skip for pagination
        const skip = (page - 1) * limit

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        // Fetch articles with pagination
        const articles = await collection
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .toArray()

        // Get total count for pagination
        const total = await collection.countDocuments(filter)

        return NextResponse.json({
            success: true,
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching articles:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch articles' },
            { status: 500 }
        )
    }
}

// POST endpoint to create new article
export async function POST(request) {
    try {
        const body = await request.json()

        // Validate required fields
        const requiredFields = ['title', 'content', 'category', 'imageUrl']
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                )
            }
        }

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        // Create article document
        const article = {
            ...body,
            views: 0,
            publishedAt: body.publishedAt || new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        // Insert article
        const result = await collection.insertOne(article)

        return NextResponse.json({
            success: true,
            articleId: result.insertedId,
            article: { ...article, _id: result.insertedId }
        }, { status: 201 })
    } catch (error) {
        console.error('Error creating article:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create article' },
            { status: 500 }
        )
    }
}
