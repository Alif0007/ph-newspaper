# 🚀 PH Newspaper API Setup Guide

This guide will help you set up MongoDB and the Next.js API routes for the PH Newspaper project.

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v5 or higher)
  - Local installation, OR
  - MongoDB Atlas account (cloud)

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB** (if not already installed):
   - **Windows**: Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - **Mac**: `brew install mongodb-community`
   - **Linux**: `sudo apt-get install mongodb`

2. **Start MongoDB**:
   ```bash
   # Windows
   mongod
   
   # Mac/Linux
   brew services start mongodb-community
   # OR
   sudo systemctl start mongod
   ```

3. **Verify MongoDB is running**:
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get your connection string
4. Update `.env.local` with your Atlas URI

## ⚙️ Environment Configuration

Your `.env.local` file should contain:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/ph-newspaper

# For MongoDB Atlas (cloud), use this format instead:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ph-newspaper?retryWrites=true&w=majority

# API Configuration (optional - for external API)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🌱 Database Seeding

Populate your database with sample articles:

```bash
# Run the seeder script
node lib/seedDatabase.js
```

This will:
- ✅ Create the `ph-newspaper` database
- ✅ Insert 15 sample articles across multiple districts
- ✅ Create database indexes for performance
- ✅ Display statistics

## 📡 API Endpoints

All endpoints are available at `/api/*`:

### **Articles**

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/articles` | List articles with filtering | `?category=news&district=dhaka&sort=publishedAt-desc&page=1&limit=10` |
| POST | `/api/articles` | Create new article | Body: `{ title, content, category, imageUrl, ... }` |
| GET | `/api/articles/:id` | Get article by ID (auto-increment views) | - |
| PUT | `/api/articles/:id` | Update article | Body: `{ title, content, ... }` |
| DELETE | `/api/articles/:id` | Delete article | - |
| GET | `/api/articles/districts` | Get districts with news | - |

### **Districts**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/districts/:district/stats` | Get category stats for district |

### **Breaking News**

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/breaking-news` | Get breaking/trending news | `?limit=5` |

### **Categories**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories with counts |

## 🧪 Testing the API

### Using Browser
```
http://localhost:3000/api/articles
http://localhost:3000/api/articles/districts
http://localhost:3000/api/breaking-news
```

### Using curl
```bash
# Get all articles
curl http://localhost:3000/api/articles

# Get articles by category
curl http://localhost:3000/api/articles?category=sports

# Get articles by district
curl http://localhost:3000/api/articles?district=dhaka

# Get article by ID
curl http://localhost:3000/api/articles/[article-id]

# Create new article
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Article Title",
    "content": "Article content here...",
    "category": "news",
    "district": "dhaka",
    "imageUrl": "https://example.com/image.jpg",
    "author": "John Doe"
  }'
```

## 📊 Database Schema

### Article Document

```javascript
{
  _id: ObjectId,
  title: String,           // Required
  content: String,         // Required
  category: String,        // Required (news, sports, politics, etc.)
  district: String,        // Required (lowercase)
  division: String,        // Optional
  imageUrl: String,        // Required
  author: String,          // Optional
  breaking: Boolean,       // Default: false
  views: Number,           // Default: 0, auto-incremented
  publishedAt: Date,       // Default: current date
  createdAt: Date,
  updatedAt: Date,
  lastViewedAt: Date
}
```

## 🔧 Development Workflow

1. **Start MongoDB** (if using local)
2. **Seed the database** (first time only):
   ```bash
   node lib/seedDatabase.js
   ```
3. **Run Next.js dev server**:
   ```bash
   npm run dev
   ```
4. **Visit** `http://localhost:3000`

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: Please add your MongoDB URI to .env.local
```
**Solution**: Ensure `MONGODB_URI` is set in `.env.local`

### Cannot connect to MongoDB
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Check if MongoDB is running: `mongosh`
- Start MongoDB: `mongod` or `brew services start mongodb-community`

### View count not incrementing
**Solution**: The API endpoint `/api/articles/:id` automatically increments views. Ensure you're using `cache: 'no-store'` when fetching.

## 📦 MongoDB Indexes

The seeder creates these indexes for optimal performance:

```javascript
collection.createIndex({ category: 1 })
collection.createIndex({ district: 1 })
collection.createIndex({ publishedAt: -1 })
collection.createIndex({ views: -1 })
collection.createIndex({ breaking: 1 })
```

## 🎯 Categories

Supported categories:
- `news` - General news
- `politics` - Political news
- `sports` - Sports updates
- `business` - Business news
- `entertainment` - Entertainment & culture
- `technology` - Tech news
- `health` - Health & wellness

## 🗺️ Districts

Articles can be tagged with any of the 64 Bangladesh districts (lowercase):
- dhaka, chittagong, sylhet, rajshahi, khulna, barisal, rangpur, mymensingh, etc.

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ph-newspaper
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)

---

**Need Help?** Check the console logs for detailed error messages.
