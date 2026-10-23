"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { getProductShareUrl } from '../../utils/seo';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

const optimizeCloudinaryUrl = (url: string, width: number = 600) => {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);
  const [copied, setCopied] = useState(false);

  const totalStock = Object.values(product.sizes || {}).reduce((acc, stock) => acc + (stock || 0), 0);
  const isSoldOut = totalStock <= 0;
  const isLowStock = totalStock > 0 && totalStock < 4;

  const isWithin30Days = product.createdAt
    ? (Date.now() - new Date(product.createdAt).getTime()) <= (30 * 24 * 60 * 60 * 1000)
    : false;
  const showNewBadge = (product.isNew || isWithin30Days) && !isSoldOut;

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productUrl = getProductShareUrl(product.id);
    const shareData = {
      title: `${product.name} | Bommier Wear`,
      text: `Otkrijte ${product.name} na Bommier Wear: ${product.price.toFixed(2)} KM`,
      url: productUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Dijeljenje otkazano:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(productUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Neuspješno kopiranje linka:', err);
      }
    }
  };

  const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL', '3XL', 'One size'];
  const sortedSizes = Object.entries(product.sizes || {}).sort(
    ([a], [b]) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
  );

  return (
    <Link
      href={`/proizvod?id=${product.id}`}
      className="group flex flex-col bg-white transition-all duration-500 relative cursor-pointer"
    >
      {/* Okvir slike artikla bez teških obruba */}
      <div className="relative aspect-[3/4] bg-[#F7F7F7] overflow-hidden">
        
        {/* Dugmad za akciju: diskretna, minimalistička */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleHeartClick}
            aria-label={isSaved ? 'Ukloni iz favorita' : 'Spremi u favorite'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSaved
                ? 'bg-black text-white'
                : 'bg-white/80 text-black hover:bg-white backdrop-blur-sm'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white stroke-white' : 'stroke-[1.5]'}`} />
          </button>

          <button
            type="button"
            onClick={handleShareClick}
            title="Podijeli artikal"
            aria-label="Podijeli artikal"
            className="w-8 h-8 rounded-full bg-white/80 text-black hover:bg-white flex items-center justify-center backdrop-blur-sm transition-all duration-300"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-black stroke-[2]" />
            ) : (
              <Share2 className="w-3.5 h-3.5 stroke-[1.5]" />
            )}
          </button>
        </div>

        {/* Obavijest o kopiranom linku */}
        {copied && (
          <div className="absolute bottom-4 inset-x-4 z-30 bg-black text-white text-[9px] tracking-[0.2em] uppercase py-1.5 text-center animate-fadeIn">
            Link kopiran
          </div>
        )}

        {/* Glavna slika */}
        <img
          src={optimizeCloudinaryUrl(product.images?.[0] || '')}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero-bg.webp';
          }}
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        {/* Sekundarna slika na hover */}
        {product.images?.[1] && (
          <img
            src={optimizeCloudinaryUrl(product.images[1])}
            alt={`${product.name} alternativni prikaz`}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero-bg.webp';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block"
          />
        )}

        {/* Suptilni bedževi */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isSoldOut ? (
            <span className="bg-neutral-800 text-white text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 font-light">
              Rasprodano
            </span>
          ) : (
            <>
              {showNewBadge && (
                <span className="bg-white/95 text-black text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 font-medium backdrop-blur-xs">
                  Novo
                </span>
              )}
              {hasDiscount && (
                <span className="bg-black text-white text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 font-light">
                  Sniženo
                </span>
              )}
              {isLowStock && (
                <span className="bg-neutral-100 text-neutral-800 text-[9px] tracking-[0.18em] uppercase px-2 py-0.5">
                  Posljednji komadi
                </span>
              )}
            </>
          )}
        </div>

        {/* Prikaz dostupnih veličina na hover */}
        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-xs py-2 px-3 text-[10px] tracking-widest flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {sortedSizes.map(([size, stock]) => (
            <span
              key={size}
              className={`${
                (stock ?? 0) > 0 ? 'text-black font-medium' : 'text-neutral-300 line-through'
              }`}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Tekstualni detalji: minimalistički i centrirani */}
      <div className="pt-4 pb-2 px-1 flex flex-col items-center text-center space-y-1">
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-light">
          {product.category}
        </span>
        
        <h3 className="text-xs uppercase tracking-widest text-neutral-900 line-clamp-1 font-normal group-hover:text-neutral-500 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs tracking-wider text-black font-light">
            {product.price.toFixed(2)} KM
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-neutral-400 line-through font-light">
              {product.originalPrice?.toFixed(2)} KM
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};