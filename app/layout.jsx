import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'PH Newspaper - Bangladesh News',
    description: 'Stay updated with the latest news from across Bangladesh. Read articles, browse categories, and explore district-wise news on Sara Desh.',
    keywords: 'Bangladesh news, PH Newspaper, Sara Desh, district news, Bengali news',
    authors: [{ name: 'PH Newspaper' }],
    openGraph: {
        title: 'PH Newspaper - Bangladesh News',
        description: 'Stay updated with the latest news from across Bangladesh',
        type: 'website',
        locale: 'en_BD',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
