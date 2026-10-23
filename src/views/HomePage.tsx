"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { getProducts } from '../lib/db';
import { Product } from '../types';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newDropProducts, setNewDropProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [subLoading, setSubLoading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    async function loadHomepageData() {
      try {
        const allProds = await getProducts();
        const activeProds = allProds.filter(p => !p.isHidden);
        setFeaturedProducts(activeProds.filter(p => p.featured).slice(0, 4));
        setNewDropProducts(
          activeProds.filter(p => p.isNew)
             .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
             .slice(0, 4)
        );
      } catch (err) {
        console.error("Greška:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomepageData();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubLoading(true);
    setSubSuccess(true);
    setEmail('');
    setTimeout(() => { setSubLoading(false); }, 1000);
  };

  return (
    <div className="font-['Inter'] bg-white">
      
      {/* 1. HERO SEKCIJA - Čista, elegantna fotografija preko cijelog ekrana */}
      <section className="relative h-screen w-full bg-[#f4f4f4] flex items-center justify-center overflow-hidden">
        {/* Zamijenite /images/hero-bg.webp sa visokokvalitetnom studijskom slikom vašeg modela */}
        <img 
          src="/images/hero-bg.webp" 
          alt="Bommier Collection" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20"></div> {/* Jako suptilan zatamnjeni sloj, samo za čitljivost */}
        
        <div className="relative z-10 text-center flex flex-col items-center mt-20 px-4">
          <h2 className="text-white text-xs sm:text-sm tracking-[0.4em] uppercase font-light mb-4">
            Kolekcija Jesen/Zima
          </h2>
          <h1 className="text-white font-['Playfair_Display'] text-5xl sm:text-7xl lg:text-8xl font-normal tracking-wide mb-8">
            Novi Standard.
          </h1>
          <Link 
            href="/shop" 
            className="border border-white text-white px-10 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
          >
            Istraži kolekciju
          </Link>
        </div>
      </section>

      {/* 2. NOVI KOMADI - Potpuni minimalizam (bez okvira) */}
      {!loading && newDropProducts.length > 0 && (
        <section className="py-24 sm:py-32 max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-normal text-black tracking-wide mb-4">Noviteti</h2>
            <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-black transition-colors border-b border-neutral-300 pb-1">
              Prikaži sve
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newDropProducts.map((product) => (
              <Link key={product.id} href={`/proizvod?id=${product.id}`} className="group block cursor-pointer">
                <div className="relative aspect-[3/4] bg-[#f9f9f9] overflow-hidden mb-5">
                  <img src={product.images?.[0] || '/hero-streetwear.webp'} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="text-center">
                  <h3 className="text-xs uppercase tracking-widest text-black font-medium mb-2">{product.name}</h3>
                  <p className="text-sm text-neutral-600 font-light">{product.price.toFixed(2)} KM</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. EDITORIAL BANNER - Inspirisano modnim magazinima */}
      <section className="py-12 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="relative aspect-video sm:aspect-[21/9] bg-[#f0f0f0] overflow-hidden flex items-center justify-center group">
          <img src="/images/category-hoodie.webp" alt="Editorial" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-90" />
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 sm:p-12 text-center max-w-md mx-4">
            <h2 className="text-2xl font-['Playfair_Display'] mb-4 text-black">Beskompromisna kvaliteta</h2>
            <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-light">
              Svaki detalj, svaki šav, pažljivo je osmišljen kako bi pružio osjećaj luksuza i trajnosti koji zaslužujete.
            </p>
            <Link href="/o-nama" className="text-[10px] uppercase tracking-[0.2em] text-black border-b border-black pb-1 hover:text-neutral-500 transition-colors">
              Otkrijte našu priču
            </Link>
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER - Elegantna i smirena forma */}
      <section className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-['Playfair_Display'] text-black mb-4">
            Bommier Society
          </h2>
          <p className="text-xs text-neutral-500 mb-10 font-light tracking-wide">
            Pretplatite se i osigurajte pristup limitiranim kolekcijama prije svih.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 border-b border-black">
            <input
              type="email"
              required
              placeholder="Unesite e-mail adresu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-2 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="text-xs uppercase tracking-widest text-black hover:text-neutral-500 px-4 py-3 transition-colors"
            >
              {subLoading ? '...' : 'Prijavi se'}
            </button>
          </form>

          {subSuccess && (
            <p className="mt-6 text-xs text-black uppercase tracking-widest">
              Dobrodošli u klub.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};