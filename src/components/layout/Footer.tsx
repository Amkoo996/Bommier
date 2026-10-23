"use client";

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Instagram, Mail, MapPin, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Footer: React.FC = () => {
  const { settings } = useCart();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t-2 border-[#C4A484] pt-16 pb-8 font-['Inter'] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Benefiti / Prednosti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-neutral-800 text-center">
          <div className="flex flex-col items-center p-4 bg-neutral-900/50 border border-neutral-800/80 rounded-xs hover:border-[#C4A484]/50 transition-colors">
            <Truck className="w-7 h-7 text-[#C4A484] mb-2.5" />
            <span className="font-['Poppins'] font-black text-xs uppercase tracking-wider text-white">PREMIUM DOSTAVA (48-72h)</span>
            <span className="text-neutral-400 text-xs mt-1">Sigurna i brza isporuka širom BiH</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-neutral-900/50 border border-neutral-800/80 rounded-xs hover:border-[#C4A484]/50 transition-colors">
            <ShieldCheck className="w-7 h-7 text-[#C4A484] mb-2.5" />
            <span className="font-['Poppins'] font-black text-xs uppercase tracking-wider text-white">SIGURNA KUPOVINA</span>
            <span className="text-neutral-400 text-xs mt-1">Plaćanje tek pri preuzimanju paketa</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-neutral-900/50 border border-neutral-800/80 rounded-xs hover:border-[#C4A484]/50 transition-colors">
            <CheckCircle2 className="w-7 h-7 text-[#C4A484] mb-2.5" />
            <span className="font-['Poppins'] font-black text-xs uppercase tracking-wider text-white">BOMMIER KVALITETA</span>
            <span className="text-neutral-400 text-xs mt-1">Ekskluzivni materijali i beskompromisan dizajn</span>
          </div>
        </div>

        {/* Glavni footer sadržaj */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo i Kratki opis brenda */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0A0A0A] border-2 border-[#C4A484]/50 group-hover:border-[#C4A484] p-1 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(196,164,132,0.15)] group-hover:scale-105 transition-all">
                <img 
                  src="/logo.png" 
                  alt="Bommier Wear" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = `<span class="font-['Poppins'] font-black text-xs text-[#C4A484]">BW</span>`;
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Poppins'] text-lg font-black tracking-widest text-white leading-none group-hover:text-[#C4A484] transition-colors">
                  BOMMIER <span className="text-[#C4A484] text-xs">wear</span>
                </span>
                <span className="text-[9px] text-neutral-400 font-bold tracking-[0.2em] uppercase mt-1">
                  Bezvremenska elegancija
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Bommier Wear je luksuzni domaći brend posvećen onima koji cijene beskompromisnu kvalitetu, vrhunske materijale i bezvremensku eleganciju u svakodnevnom odijevanju.
            </p>

            <a
              href="https://instagram.com/bommier.wear"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-700 hover:border-[#C4A484] text-xs font-['Poppins'] font-bold uppercase tracking-wider text-neutral-300 hover:text-[#C4A484] hover:bg-neutral-900 transition-all rounded-xs"
            >
              <Instagram className="w-4 h-4 text-[#C4A484]" />
              <span>@bommier.wear</span>
            </a>
          </div>

          {/* Stranice */}
          <div>
            <h4 className="font-['Poppins'] text-xs font-black uppercase tracking-[0.2em] text-[#C4A484] mb-4">
              STRANICE
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li><Link href="/shop" className="hover:text-[#C4A484] transition-colors">Kolekcija</Link></li>
              <li><Link href="/o-nama" className="hover:text-[#C4A484] transition-colors">O nama</Link></li>
              <li><Link href="/kontakt" className="hover:text-[#C4A484] transition-colors">Kontakt</Link></li>
              <li><Link href="/dostava-i-povrat" className="hover:text-[#C4A484] transition-colors">Dostava i povrat (Praćenje)</Link></li>
              <li><Link href="/uslovi-koristenja" className="hover:text-[#C4A484] transition-colors">Uslovi korištenja</Link></li>
              <li><Link href="/politika-privatnosti" className="hover:text-[#C4A484] transition-colors">Politika privatnosti</Link></li>
            </ul>
          </div>

          {/* Kontakt podaci */}
          <div>
            <h4 className="font-['Poppins'] text-xs font-black uppercase tracking-[0.2em] text-[#C4A484] mb-4">
              KONTAKT
            </h4>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C4A484] shrink-0" />
                <span>{settings?.email || 'info@bommier.ba'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4A484] shrink-0 mt-0.5" />
                <span>Brza dostava širom BiH • Ekskluzivna usluga</span>
              </li>
            </ul>
          </div>

          {/* Info kurirska služba */}
          <div className="space-y-3 bg-neutral-900/40 border border-neutral-800 p-4 rounded-xs">
            <h4 className="font-['Poppins'] text-xs font-black uppercase tracking-[0.15em] text-[#C4A484]">
              POUZDANA DOSTAVA
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Sve pakete šaljemo pouzdanom kurirskom službom. Vaše zadovoljstvo i sigurnost pošiljke su nam na prvom mjestu.
            </p>
          </div>

        </div>

        {/* Donja traka + Katanac za Admin */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Bommier Wear. Sva prava zadržana.</p>
          
          <div className="flex items-center gap-3">
            <span>Plaćanje pouzećem</span>
            <span className="text-neutral-700">•</span>
            
            <Link
              href="/admin"
              className="p-1 text-neutral-600 hover:text-[#C4A484] transition-colors cursor-pointer"
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};