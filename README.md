# PH Newspaper - Online News Platform

A modern, responsive news platform built with Next.js 14, React, and MongoDB, featuring real-time news updates, dynamic routing, and interactive data visualization.

## Features

- **Real-time News Updates**: Dynamic content loaded from MongoDB database
- **Interactive Maps**: Interactive Bangladesh district map with news coverage
- **Responsive Design**: Mobile-first responsive layout using Tailwind CSS
- **SEO Optimized**: Proper metadata and structured data
- **Modern UI/UX**: Clean, professional newspaper interface with engaging interactions
- **Category-based Navigation**: Organized news by categories and districts
- **Breaking News Ticker**: Live breaking news updates
- **View Tracking**: Automatic view count incrementing for articles

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with native driver
- **Visualization**: Recharts for data visualization
- **Maps**: React Leaflet for interactive maps
- **Deployment**: Node.js runtime

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ph-newspaper
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Seed the database with sample data:
```bash
node lib/seedDatabase.js
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── api/                  # API routes for data fetching
│   ├── news/                 # News category and article pages
│   ├── saradesh/             # District-based news pages
│   └── page.jsx              # Home page
├── components/              # Reusable UI components
├── lib/                     # Utility functions and database connection
└── public/                  # Static assets
```

## Key Components

- **Homepage**: Displays featured articles, breaking news, and category navigation
- **News Categories**: Dynamic routing for different news categories
- **Article Details**: Individual article pages with view tracking
- **Sara Desh**: District-based news visualization with interactive map
- **Header/Footer**: Consistent navigation across all pages

## API Endpoints

- `GET /api/articles` - Fetch articles with pagination and filtering
- `GET /api/articles/:id` - Fetch single article by ID (increments view count)
- `GET /api/categories` - Fetch all news categories with counts
- `GET /api/breaking-news` - Fetch breaking news articles
- `GET /api/articles/districts` - Fetch districts with news coverage
- `GET /api/districts/:district/stats` - Fetch district-specific statistics

## Database Schema

The application uses a MongoDB database with the following collections:

- **articles**: Stores news articles with fields like title, content, category, views, district, etc.

