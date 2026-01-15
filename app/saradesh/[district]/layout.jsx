export async function generateMetadata({ params }) {
    const district = params.district
    const districtName = district.charAt(0).toUpperCase() + district.slice(1)

    return {
        title: `${districtName} District News | Sara Desh | PH Newspaper`,
        description: `Latest news, updates, and stories from ${districtName} district. Browse by category, view statistics, and stay informed about local developments.`,
        keywords: `${districtName} news, ${districtName} Bangladesh, district news, local news, Sara Desh`,
        openGraph: {
            title: `${districtName} District News - Sara Desh`,
            description: `Explore comprehensive news coverage from ${districtName} district, Bangladesh`,
            type: 'website',
        },
    }
}

export default function DistrictLayout({ children }) {
    return children
}
