"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../types';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { items, setIsCartOpen, settings } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const cartItemCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const visibleCategories = CATEGORIES.filter((cat) => {
    return cat !== 'Rasprodano' && !settings?.hiddenCategories?.includes(cat);
  });

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 bg-white ${isScrolled ? 'shadow-sm' : ''}`}>
      
      {/* Vrlo diskretna gornja traka */}
      <div className="bg-black text-white text-center py-1.5 text-[10px] tracking-[0.2em] font-light uppercase">
        Besplatna dostava za narudžbe iznad 150 KM
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          
          {/* LJEVA STRANA: Hamburger za mobitel / Prazno na desktopu radi balansa */}
          <div className="flex-1 flex items-center justify-start">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-black p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
            <div className="hidden md:flex gap-8">
               <Link href="/shop" className="text-xs uppercase tracking-widest text-black hover:text-neutral-500 transition-colors">Kolekcija</Link>
               <Link href="/o-nama" className="text-xs uppercase tracking-widest text-black hover:text-neutral-500 transition-colors">Brend</Link>
            </div>
          </div>
          
          {/* CENTAR: Logo - Čist i dominantan */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold tracking-[0.2em] text-black">
                BOMMIER
              </span>
              {/* Opcijonalno: možete dodati mali logo ispod ili iznad, ali samo tipografija izgleda jako luksuzno */}
            </Link>
          </div>

          {/* DESNA STRANA: Ikone */}
          <div className="flex-1 flex items-center justify-end gap-5 sm:gap-6">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-black hover:text-neutral-500 transition-colors p-1 hidden sm:block">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <a href="https://instagram.com/bommier.wear" target="_blank" rel="noopener noreferrer" className="text-black hover:text-neutral-500 transition-colors p-1 hidden md:block">
              <User className="w-5 h-5 stroke-[1.5]" /> {/* Koristimo User ikonu umjesto klasične IG za pročišćen izgled */}
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-black hover:text-neutral-500 transition-colors p-1"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pretraga dropdown - Minimalistički */}
        <div className={`overflow-hidden transition-all duration-500 ${isSearchOpen ? 'max-h-24 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center border-b border-black pb-2">
            <input
              type="text"
              placeholder="Pretražite kolekciju"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm px-2 py-2 focus:outline-none placeholder-neutral-400 font-light"
            />
            <button type="submit" className="px-4 text-xs uppercase tracking-widest hover:text-neutral-500">Traži</button>
          </form>
        </div>
      </div>

      {/* Mobile Menu - Apsolutno pročišćen */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[100px] bg-white z-30 flex flex-col p-8">
          <div className="flex flex-col space-y-8 text-center mt-10">
            <Link href="/" className="text-xl font-light uppercase tracking-widest text-black">Početna</Link>
            <Link href="/shop" className="text-xl font-light uppercase tracking-widest text-black">Nova Kolekcija</Link>
            <Link href="/o-nama" className="text-xl font-light uppercase tracking-widest text-black">O Brendu</Link>
            <Link href="/kontakt" className="text-xl font-light uppercase tracking-widest text-black">Korisnička Podrška</Link>
          </div>
          <div className="mt-auto pb-10 text-center flex justify-center gap-8">
            <a href="https://instagram.com/bommier.wear" className="text-sm font-light tracking-widest uppercase border-b border-black pb-1">Instagram</a>
          </div>
        </div>
      )}
    </header>
  );
};