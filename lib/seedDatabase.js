// Database seeder script for MongoDB
// Run this to populate your database with sample articles
// Usage: node lib/seedDatabase.js

const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

const uri = process.env.MONGODB_URI
if (!uri) {
    console.error('❌ Error: MONGODB_URI not found in .env.local')
    process.exit(1)
}

const dbName = 'ph-newspaper'

// Sample articles data
const sampleArticles = [
    // Dhaka - Multiple categories
    {
        title: 'Breaking: Major Development Project Announced in Dhaka',
        content: 'The government has announced a major infrastructure development project in Dhaka that will transform the city\'s transportation system...',
        category: 'news',
        district: 'dhaka',
        division: 'Dhaka',
        imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
        author: 'Rahim Khan',
        breaking: true,
        views: 1250,
        publishedAt: new Date('2024-01-14T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Dhaka Traffic System Gets Major Upgrade',
        content: 'New traffic management systems are being installed across Dhaka to reduce congestion...',
        category: 'politics',
        district: 'dhaka',
        division: 'Dhaka',
        imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
        author: 'Fatima Rahman',
        breaking: false,
        views: 890,
        publishedAt: new Date('2024-01-13T15:30:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Cultural Festival Celebrates Dhaka\'s Rich Heritage',
        content: 'A week-long cultural festival showcasing traditional music, dance, and art is underway in the capital...',
        category: 'entertainment',
        district: 'dhaka',
        division: 'Dhaka',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
        author: 'Sarah Ahmed',
        breaking: false,
        views: 650,
        publishedAt: new Date('2024-01-12T09:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Chittagong
    {
        title: 'Chittagong Port Handles Record Cargo Volume',
        content: 'The port of Chittagong has reported record-breaking cargo handling volumes this quarter...',
        category: 'business',
        district: 'chittagong',
        division: 'Chittagong',
        imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800',
        author: 'Kamal Hossain',
        breaking: false,
        views: 720,
        publishedAt: new Date('2024-01-13T11:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'International Cricket Match Thrills Chittagong Fans',
        content: 'Bangladesh cricket team secures victory in an exciting match at Zahur Ahmed Chowdhury Stadium...',
        category: 'sports',
        district: 'chittagong',
        division: 'Chittagong',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
        author: 'Imran Ali',
        breaking: true,
        views: 1580,
        publishedAt: new Date('2024-01-14T18:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Sylhet
    {
        title: 'Tea Industry Booms in Sylhet Region',
        content: 'Sylhet\'s tea gardens are experiencing unprecedented growth with new export opportunities...',
        category: 'business',
        district: 'sylhet',
        division: 'Sylhet',
        imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
        author: 'Nadia Chowdhury',
        breaking: false,
        views: 540,
        publishedAt: new Date('2024-01-11T14:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Sylhet Tourism Sees 40% Growth This Year',
        content: 'The scenic beauty of Sylhet continues to attract both local and international tourists...',
        category: 'news',
        district: 'sylhet',
        division: 'Sylhet',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        author: 'Tanvir Islam',
        breaking: false,
        views: 980,
        publishedAt: new Date('2024-01-10T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Rajshahi
    {
        title: 'Historic Mosque Restoration Completed in Rajshahi',
        content: 'A 400-year-old mosque in Rajshahi has been beautifully restored to its former glory...',
        category: 'entertainment',
        district: 'rajshahi',
        division: 'Rajshahi',
        imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800',
        author: 'Mahmud Hassan',
        breaking: false,
        views: 430,
        publishedAt: new Date('2024-01-09T16:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Khulna
    {
        title: 'Sundarbans Conservation Project Receives International Recognition',
        content: 'Khulna\'s conservation efforts in the Sundarbans mangrove forest have been recognized globally...',
        category: 'news',
        district: 'khulna',
        division: 'Khulna',
        imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
        author: 'Rupa Begum',
        breaking: true,
        views: 1120,
        publishedAt: new Date('2024-01-14T08:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Barisal
    {
        title: 'Floating Market Tradition Thrives in Barisal',
        content: 'The centuries-old floating market tradition continues to be a major attraction in Barisal...',
        category: 'entertainment',
        district: 'barisal',
        division: 'Barisal',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        author: 'Jalal Uddin',
        breaking: false,
        views: 670,
        publishedAt: new Date('2024-01-08T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Rangpur
    {
        title: 'Agriculture Innovation Hub Opens in Rangpur',
        content: 'A new technology center aims to revolutionize farming practices in northern Bangladesh...',
        category: 'technology',
        district: 'rangpur',
        division: 'Rangpur',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        author: 'Habib Rahman',
        breaking: false,
        views: 520,
        publishedAt: new Date('2024-01-07T11:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Mymensingh
    {
        title: 'Education Initiative Launched for Rural Students in Mymensingh',
        content: 'A comprehensive education program aims to improve learning outcomes in rural areas...',
        category: 'news',
        district: 'mymensingh',
        division: 'Mymensingh',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        author: 'Sharmin Akter',
        breaking: false,
        views: 790,
        publishedAt: new Date('2024-01-06T09:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Additional articles for variety
    {
        title: 'Bangladesh Cricket Team Wins Series',
        content: 'In a spectacular display of skill, the national cricket team has won the international series...',
        category: 'sports',
        district: 'dhaka',
        division: 'Dhaka',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
        author: 'Shakib Ahmed',
        breaking: true,
        views: 2340,
        publishedAt: new Date('2024-01-14T20:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Tech Startup Raises $5M in Funding',
        content: 'A Dhaka-based technology startup has successfully raised significant funding from international investors...',
        category: 'technology',
        district: 'dhaka',
        division: 'Dhaka',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
        author: 'Nafisa Khan',
        breaking: false,
        views: 1450,
        publishedAt: new Date('2024-01-13T13:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'New Healthcare Facility Opens in Rural Chittagong',
        content: 'A state-of-the-art healthcare facility has been inaugurated to serve rural communities...',
        category: 'health',
        district: 'chittagong',
        division: 'Chittagong',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        author: 'Dr. Mustafa Ali',
        breaking: false,
        views: 680,
        publishedAt: new Date('2024-01-12T14:30:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

async function seedDatabase() {
    const client = new MongoClient(uri)

    try {
        console.log('🔌 Connecting to MongoDB...')
        await client.connect()
        console.log('✅ Connected successfully to MongoDB')

        const db = client.db(dbName)
        const collection = db.collection('articles')

        // Clear existing articles (optional - comment out to keep existing data)
        console.log('🗑️  Clearing existing articles...')
        await collection.deleteMany({})

        // Insert sample articles
        console.log('📝 Inserting sample articles...')
        const result = await collection.insertMany(sampleArticles)
        console.log(`✅ Successfully inserted ${result.insertedCount} articles`)

        // Create indexes for better performance
        console.log('📊 Creating database indexes...')
        await collection.createIndex({ category: 1 })
        await collection.createIndex({ district: 1 })
        await collection.createIndex({ publishedAt: -1 })
        await collection.createIndex({ views: -1 })
        await collection.createIndex({ breaking: 1 })
        console.log('✅ Indexes created successfully')

        // Display statistics
        const stats = await collection.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]).toArray()

        console.log('\n📈 Database Statistics:')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        stats.forEach(stat => {
            console.log(`${stat._id}: ${stat.count} articles`)
        })
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log(`\n🎉 Database seeding completed successfully!`)
        console.log(`📍 Database: ${dbName}`)
        console.log(`📦 Total articles: ${sampleArticles.length}`)

    } catch (error) {
        console.error('❌ Error seeding database:', error)
        process.exit(1)
    } finally {
        await client.close()
        console.log('\n👋 Connection closed')
    }
}

// Run the seeder
seedDatabase()
