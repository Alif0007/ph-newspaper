// Sample article database for metadata
const articles = {
    '1': {
        id: 1,
        title: 'Breaking: Major Development Initiative Announced for Rural Bangladesh',
        content: 'In a historic announcement, the government has unveiled a comprehensive development initiative...',
        category: 'National',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200',
        date: 'January 13, 2026',
        author: 'Rahman Ahmed',
        tags: ['Development', 'Infrastructure', 'Rural', 'Economy'],
    },
    '2': {
        id: 2,
        title: 'Dhaka Metro Rail Expansion: New Routes to Be Added by 2027',
        content: 'Transportation authorities have confirmed ambitious plans to expand Dhaka metro rail system...',
        category: 'Transportation',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200',
        date: 'January 13, 2026',
        author: 'Fatima Khan',
        tags: ['Metro Rail', 'Transportation', 'Dhaka', 'Infrastructure'],
    },
}

export async function generateMetadata({ params }) {
    const article = articles[params.id] || articles['1']

    return {
        title: `${article.title} | PH Newspaper`,
        description: article.content.substring(0, 160).replace(/<[^>]*>/g, ''),
        keywords: article.tags.join(', '),
        authors: [{ name: article.author }],
        openGraph: {
            title: article.title,
            description: article.content.substring(0, 160).replace(/<[^>]*>/g, ''),
            type: 'article',
            publishedTime: article.date,
            authors: [article.author],
            images: [
                {
                    url: article.image,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.content.substring(0, 160).replace(/<[^>]*>/g, ''),
            images: [article.image],
        },
    }
}

export default function ArticleLayout({ children }) {
    return children
}
