'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'News', href: '/news/news' },
        { name: 'Politics', href: '/news/politics' },
        { name: 'Sports', href: '/news/sports' },
        { name: 'Business', href: '/news/business' },
        { name: 'Sara Desh', href: '/saradesh' },
    ]

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-primary text-white py-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
                    <div>
                        📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="hover:text-gray-200 transition-colors">Contact</a>
                        <a href="#" className="hover:text-gray-200 transition-colors">About</a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="text-primary font-bold text-3xl group-hover:scale-110 transition-transform">
                            📰
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                PH Newspaper
                            </h1>
                            <p className="text-xs text-gray-500">Bangladesh&apos;s Voice</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary font-semibold transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-gray-700 hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block py-2 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 rounded transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    )
}
