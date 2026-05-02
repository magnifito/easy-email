"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  Play,
} from "lucide-react";
import { products, productReviews, blogPosts } from "../data/data";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const product = products[0];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SOUNDWAVE
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Speakers</Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Headphones</Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Microphones</Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Bundles</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / Product Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button key={i} className="aspect-square relative rounded-xl overflow-hidden bg-gray-50 border border-transparent hover:border-blue-600 transition-all">
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Best Seller
                  </span>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500 font-medium">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-end space-x-4">
                <span className="text-4xl font-bold text-gray-900">{product.salePrice}</span>
                <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice}</span>
                <span className="text-green-600 font-semibold mb-1">Save 13%</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                    Choose Color
                  </label>
                  <div className="flex space-x-3">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color.name}
                        className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-transparent hover:ring-gray-300 transition-all"
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="flex-1 bg-gray-900 text-white h-14 rounded-xl font-bold hover:bg-gray-800 transition-all transform active:scale-[0.98]">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-white text-gray-900 border-2 border-gray-200 h-14 rounded-xl font-bold hover:border-gray-900 transition-all">
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">2 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Lifetime Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            {product.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-8 text-sm font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {activeTab === "description" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="prose prose-blue max-w-none">
                  <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-line">
                    {product.content[0].text}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.content[0].features?.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="mt-1 bg-blue-100 rounded-full p-1">
                        <ChevronRight className="w-3 h-3 text-blue-600" />
                      </div>
                      <p className="text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <table className="w-full">
                  <tbody>
                    {product.content[1].table?.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="py-4 font-bold text-gray-900 w-1/3">{row.label}</td>
                        <td className="py-4 text-gray-600">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {productReviews.map((review, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{review.user}</h4>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-400">Verified Buyer</span>
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Audio Insights</h2>
              <p className="text-gray-600">Deep dives into sound engineering and gear guides.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center text-blue-600 font-bold hover:underline">
              View All Posts <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-6">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>By {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <span className="text-2xl font-bold">SOUNDWAVE</span>
              <p className="text-gray-400 text-sm leading-relaxed">
                Elevating the auditory experience through precision-engineered audio gear. Join our community of audiophiles.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><Facebook className="w-4 h-4" /></Link>
                <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><Twitter className="w-4 h-4" /></Link>
                <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><Instagram className="w-4 h-4" /></Link>
                <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><Youtube className="w-4 h-4" /></Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-blue-500">Shop</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">All Speakers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Studio Monitors</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Headphones</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Microphones</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-blue-500">Support</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Warranty</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Return Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-blue-500">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest audio news and exclusive offers.</p>
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 transition-all"
                />
                <button className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-xs">© 2024 SOUNDWAVE Audio. All rights reserved.</p>
            <div className="flex space-x-6 text-gray-500 text-xs font-medium">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
