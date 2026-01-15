import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
    try {
        const { id } = params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid article ID format' },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        const article = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $inc: { views: 1 },
                $set: { lastViewedAt: new Date() }
            },
            {
                returnDocument: 'after'
            }
        )

        if (!article) {
            return NextResponse.json(
                { success: false, error: 'Article not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            article
        })
    } catch (error) {
        console.error('Error fetching article:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch article' },
            { status: 500 }
        )
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const body = await request.json()

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid article ID format' },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        delete body._id
        delete body.createdAt
        delete body.views

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...body,
                    updatedAt: new Date()
                }
            },
            { returnDocument: 'after' }
        )

        if (!result) {
            return NextResponse.json(
                { success: false, error: 'Article not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            article: result
        })
    } catch (error) {
        console.error('Error updating article:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update article' },
            { status: 500 }
        )
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid article ID format' },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db('ph-newspaper')
        const collection = db.collection('articles')

        const result = await collection.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, error: 'Article not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Article deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting article:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete article' },
            { status: 500 }
        )
    }
}
