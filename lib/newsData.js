// Sample news data with district information
// In production, this will be fetched from MongoDB

export const bangladeshDistricts = {
    'Dhaka': {
        bengali: 'ঢাকা',
        division: 'Dhaka',
        lat: 23.8103,
        lng: 90.4125,
        districts: ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail']
    },
    'Chittagong': {
        bengali: 'চট্টগ্রাম',
        division: 'Chittagong',
        lat: 22.3569,
        lng: 91.7832,
        districts: ['Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Cox\'s Bazar', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati']
    },
    'Rajshahi': {
        bengali: 'রাজশাহী',
        division: 'Rajshahi',
        lat: 24.3745,
        lng: 88.6042,
        districts: ['Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Rajshahi', 'Sirajgonj']
    },
    'Khulna': {
        bengali: 'খুলনা',
        division: 'Khulna',
        lat: 22.8456,
        lng: 89.5403,
        districts: ['Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira']
    },
    'Barisal': {
        bengali: 'বরিশাল',
        division: 'Barisal',
        lat: 22.7010,
        lng: 90.3535,
        districts: ['Barguna', 'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur']
    },
    'Sylhet': {
        bengali: 'সিলেট',
        division: 'Sylhet',
        lat: 24.8949,
        lng: 91.8687,
        districts: ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet']
    },
    'Rangpur': {
        bengali: 'রংপুর',
        division: 'Rangpur',
        lat: 25.7439,
        lng: 89.2752,
        districts: ['Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon']
    },
    'Mymensingh': {
        bengali: 'ময়মনসিংহ',
        division: 'Mymensingh',
        lat: 24.7471,
        lng: 90.4203,
        districts: ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur']
    }
}

// District coordinates (major districts)
export const districtCoordinates = {
    // Dhaka Division
    'dhaka': { lat: 23.8103, lng: 90.4125, bengali: 'ঢাকা', division: 'Dhaka' },
    'faridpur': { lat: 23.6070, lng: 89.8429, bengali: 'ফরিদপুর', division: 'Dhaka' },
    'gazipur': { lat: 23.9999, lng: 90.4203, bengali: 'গাজীপুর', division: 'Dhaka' },
    'gopalganj': { lat: 23.0050, lng: 89.8266, bengali: 'গোপালগঞ্জ', division: 'Dhaka' },
    'kishoreganj': { lat: 24.4449, lng: 90.7765, bengali: 'কিশোরগঞ্জ', division: 'Dhaka' },
    'madaripur': { lat: 23.1641, lng: 90.1897, bengali: 'মাদারীপুর', division: 'Dhaka' },
    'manikganj': { lat: 23.8644, lng: 90.0047, bengali: 'মানিকগঞ্জ', division: 'Dhaka' },
    'munshiganj': { lat: 23.5422, lng: 90.5305, bengali: 'মুন্সিগঞ্জ', division: 'Dhaka' },
    'narayanganj': { lat: 23.6238, lng: 90.4996, bengali: 'নারায়ণগঞ্জ', division: 'Dhaka' },
    'narsingdi': { lat: 23.9322, lng: 90.7151, bengali: 'নরসিংদী', division: 'Dhaka' },
    'rajbari': { lat: 23.7574, lng: 89.6444, bengali: 'রাজবাড়ী', division: 'Dhaka' },
    'shariatpur': { lat: 23.2423, lng: 90.4348, bengali: 'শরীয়তপুর', division: 'Dhaka' },
    'tangail': { lat: 24.2513, lng: 89.9167, bengali: 'টাঙ্গাইল', division: 'Dhaka' },

    // Chittagong Division
    'bandarban': { lat: 22.1953, lng: 92.2183, bengali: 'বান্দরবান', division: 'Chittagong' },
    'brahmanbaria': { lat: 23.9570, lng: 91.1119, bengali: 'ব্রাহ্মণবাড়িয়া', division: 'Chittagong' },
    'chandpur': { lat: 23.2332, lng: 90.6712, bengali: 'চাঁদপুর', division: 'Chittagong' },
    'chittagong': { lat: 22.3569, lng: 91.7832, bengali: 'চট্টগ্রাম', division: 'Chittagong' },
    'comilla': { lat: 23.4607, lng: 91.1809, bengali: 'কুমিল্লা', division: 'Chittagong' },
    'coxsbazar': { lat: 21.4272, lng: 92.0058, bengali: 'কক্সবাজার', division: 'Chittagong' },
    'feni': { lat: 23.0159, lng: 91.3976, bengali: 'ফেনী', division: 'Chittagong' },
    'khagrachhari': { lat: 23.1193, lng: 91.9847, bengali: 'খাগড়াছড়ি', division: 'Chittagong' },
    'lakshmipur': { lat: 22.9447, lng: 90.8412, bengali: 'লক্ষ্মীপুর', division: 'Chittagong' },
    'noakhali': { lat: 22.8696, lng: 91.0995, bengali: 'নোয়াখালী', division: 'Chittagong' },
    'rangamati': { lat: 22.7324, lng: 92.2985, bengali: 'রাঙ্গামাটি', division: 'Chittagong' },

    // Rajshahi Division
    'bogra': { lat: 24.8465, lng: 89.3770, bengali: 'বগুড়া', division: 'Rajshahi' },
    'joypurhat': { lat: 25.0968, lng: 89.0227, bengali: 'জয়পুরহাট', division: 'Rajshahi' },
    'naogaon': { lat: 24.7936, lng: 88.9318, bengali: 'নওগাঁ', division: 'Rajshahi' },
    'natore': { lat: 24.4206, lng: 89.0000, bengali: 'নাটোর', division: 'Rajshahi' },
    'nawabganj': { lat: 24.5965, lng: 88.2775, bengali: 'নবাবগঞ্জ', division: 'Rajshahi' },
    'pabna': { lat: 24.0064, lng: 89.2372, bengali: 'পাবনা', division: 'Rajshahi' },
    'rajshahi': { lat: 24.3745, lng: 88.6042, bengali: 'রাজশাহী', division: 'Rajshahi' },
    'sirajgonj': { lat: 24.4533, lng: 89.7006, bengali: 'সিরাজগঞ্জ', division: 'Rajshahi' },

    // Khulna Division
    'bagerhat': { lat: 22.6602, lng: 89.7851, bengali: 'বাগেরহাট', division: 'Khulna' },
    'chuadanga': { lat: 23.6401, lng: 88.8410, bengali: 'চুয়াডাঙ্গা', division: 'Khulna' },
    'jessore': { lat: 23.1634, lng: 89.2182, bengali: 'যশোর', division: 'Khulna' },
    'jhenaidah': { lat: 23.5450, lng: 89.1539, bengali: 'ঝিনাইদহ', division: 'Khulna' },
    'khulna': { lat: 22.8456, lng: 89.5403, bengali: 'খুলনা', division: 'Khulna' },
    'kushtia': { lat: 23.9011, lng: 89.1203, bengali: 'কুষ্টিয়া', division: 'Khulna' },
    'magura': { lat: 23.4855, lng: 89.4198, bengali: 'মাগুরা', division: 'Khulna' },
    'meherpur': { lat: 23.7626, lng: 88.6318, bengali: 'মেহেরপুর', division: 'Khulna' },
    'narail': { lat: 23.1725, lng: 89.5840, bengali: 'নড়াইল', division: 'Khulna' },
    'satkhira': { lat: 22.3155, lng: 89.0696, bengali: 'সাতক্ষীরা', division: 'Khulna' },

    // Barisal Division
    'barguna': { lat: 22.1590, lng: 90.1119, bengali: 'বরগুনা', division: 'Barisal' },
    'barisal': { lat: 22.7010, lng: 90.3535, bengali: 'বরিশাল', division: 'Barisal' },
    'bhola': { lat: 22.6859, lng: 90.6482, bengali: 'ভোলা', division: 'Barisal' },
    'jhalokati': { lat: 22.6406, lng: 90.1987, bengali: 'ঝালকাঠি', division: 'Barisal' },
    'patuakhali': { lat: 22.3596, lng: 90.3298, bengali: 'পটুয়াখালী', division: 'Barisal' },
    'pirojpur': { lat: 22.5841, lng: 89.9720, bengali: 'পিরোজপুর', division: 'Barisal' },

    // Sylhet Division
    'habiganj': { lat: 24.3745, lng: 91.4156, bengali: 'হবিগঞ্জ', division: 'Sylhet' },
    'moulvibazar': { lat: 24.4829, lng: 91.7774, bengali: 'মৌলভীবাজার', division: 'Sylhet' },
    'sunamganj': { lat: 25.0657, lng: 91.3950, bengali: 'সুনামগঞ্জ', division: 'Sylhet' },
    'sylhet': { lat: 24.8949, lng: 91.8687, bengali: 'সিলেট', division: 'Sylhet' },

    // Rangpur Division
    'dinajpur': { lat: 25.6217, lng: 88.6354, bengali: 'দিনাজপুর', division: 'Rangpur' },
    'gaibandha': { lat: 25.3284, lng: 89.5430, bengali: 'গাইবান্ধা', division: 'Rangpur' },
    'kurigram': { lat: 25.8073, lng: 89.6299, bengali: 'কুড়িগ্রাম', division: 'Rangpur' },
    'lalmonirhat': { lat: 25.9923, lng: 89.2847, bengali: 'লালমনিরহাট', division: 'Rangpur' },
    'nilphamari': { lat: 25.9319, lng: 88.8560, bengali: 'নীলফামারী', division: 'Rangpur' },
    'panchagarh': { lat: 26.2708, lng: 88.5953, bengali: 'পঞ্চগড়', division: 'Rangpur' },
    'rangpur': { lat: 25.7439, lng: 89.2752, bengali: 'রংপুর', division: 'Rangpur' },
    'thakurgaon': { lat: 26.0336, lng: 88.4616, bengali: 'ঠাকুরগাঁও', division: 'Rangpur' },

    // Mymensingh Division
    'jamalpur': { lat: 24.9375, lng: 89.9377, bengali: 'জামালপুর', division: 'Mymensingh' },
    'mymensingh': { lat: 24.7471, lng: 90.4203, bengali: 'ময়মনসিংহ', division: 'Mymensingh' },
    'netrokona': { lat: 24.8103, lng: 90.7276, bengali: 'নেত্রকোণা', division: 'Mymensingh' },
    'sherpur': { lat: 25.0204, lng: 90.0152, bengali: 'শেরপুর', division: 'Mymensingh' }
}

// Sample news data
export const sampleNews = [
    {
        _id: '1',
        title: 'Dhaka Metro Rail Phase 2 Construction Begins',
        content: 'New metro line to connect Uttara to Motijheel with advanced technology...',
        category: 'transportation',
        district: 'dhaka',
        division: 'Dhaka',
        publishedAt: new Date('2026-01-13'),
        views: 15420,
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400'
    },
    {
        _id: '2',
        title: 'Smart City Initiative Launched in Dhaka',
        content: 'Digital transformation aims to improve urban services across the capital...',
        category: 'technology',
        district: 'dhaka',
        division: 'Dhaka',
        publishedAt: new Date('2026-01-12'),
        views: 12350,
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400'
    },
    {
        _id: '3',
        title: 'Chittagong Port Expansion Project Approved',
        content: 'Major investment to increase container handling capacity and modernize facilities...',
        category: 'economy',
        district: 'chittagong',
        division: 'Chittagong',
        publishedAt: new Date('2026-01-13'),
        views: 9870,
        imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400'
    },
    {
        _id: '4',
        title: 'Tea Production Reaches Record High in Sylhet',
        content: 'Favorable weather boosts annual tea harvest to unprecedented levels...',
        category: 'agriculture',
        district: 'sylhet',
        division: 'Sylhet',
        publishedAt: new Date('2026-01-11'),
        views: 7650,
        imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'
    },
    {
        _id: '5',
        title: 'Rajshahi University Hosts International Science Fair',
        content: 'Students from 15 countries participate in annual science competition...',
        category: 'education',
        district: 'rajshahi',
        division: 'Rajshahi',
        publishedAt: new Date('2026-01-10'),
        views: 5430,
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
    },
    {
        _id: '6',
        title: 'Khulna Shipyard Secures Major Export Order',
        content: 'Local shipbuilding industry gains international recognition...',
        category: 'economy',
        district: 'khulna',
        division: 'Khulna',
        publishedAt: new Date('2026-01-12'),
        views: 6780,
        imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400'
    },
    {
        _id: '7',
        title: 'Rangpur Agricultural Innovation Center Opens',
        content: 'New facility to boost crop yields through modern farming techniques...',
        category: 'agriculture',
        district: 'rangpur',
        division: 'Rangpur',
        publishedAt: new Date('2026-01-09'),
        views: 4920,
        imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400'
    },
    {
        _id: '8',
        title: 'Mymensingh District Wins National Clean City Award',
        content: 'Recognition for outstanding waste management and environmental initiatives...',
        category: 'environment',
        district: 'mymensingh',
        division: 'Mymensingh',
        publishedAt: new Date('2026-01-08'),
        views: 3840,
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'
    },
    {
        _id: '9',
        title: 'Comilla Medical College Introduces Telemedicine Services',
        content: 'Rural patients can now consult specialists remotely...',
        category: 'health',
        district: 'comilla',
        division: 'Chittagong',
        publishedAt: new Date('2026-01-11'),
        views: 5120,
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400'
    },
    {
        _id: '10',
        title: 'Gazipur Industrial Park Attracts Foreign Investment',
        content: 'Three multinational companies announce new manufacturing facilities...',
        category: 'economy',
        district: 'gazipur',
        division: 'Dhaka',
        publishedAt: new Date('2026-01-10'),
        views: 8760,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    }
]

// Helper function to get districts with news
export function getDistrictsWithNews() {
    const districts = new Set()
    sampleNews.forEach(news => districts.add(news.district))
    return Array.from(districts)
}

// Helper function to get news by district
export function getNewsByDistrict(district, { category = null, sort = 'newest', limit = null } = {}) {
    let filtered = sampleNews.filter(news => news.district === district.toLowerCase())

    if (category && category !== 'all') {
        filtered = filtered.filter(news => news.category === category)
    }

    if (sort === 'newest') {
        filtered.sort((a, b) => b.publishedAt - a.publishedAt)
    } else if (sort === 'oldest') {
        filtered.sort((a, b) => a.publishedAt - b.publishedAt)
    } else if (sort === 'popular') {
        filtered.sort((a, b) => b.views - a.views)
    }

    if (limit) {
        filtered = filtered.slice(0, limit)
    }

    return filtered
}

// Helper function to get news count by category for a district
export function getDistrictStatistics(district) {
    const districtNews = sampleNews.filter(news => news.district === district.toLowerCase())
    const stats = {}

    districtNews.forEach(news => {
        stats[news.category] = (stats[news.category] || 0) + 1
    })

    return {
        total: districtNews.length,
        byCategory: stats,
        totalViews: districtNews.reduce((sum, news) => sum + news.views, 0)
    }
}

// Get all unique categories
export function getAllCategories() {
    const categories = new Set(sampleNews.map(news => news.category))
    return ['all', ...Array.from(categories)]
}
