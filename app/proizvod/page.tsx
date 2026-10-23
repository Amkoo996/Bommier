"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductById } from '../../src/lib/db';
import { ProductDetailPage } from '../../src/views/ProductDetailPage';
import type { Product } from '../../src/types';

function ProductLoader() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading');

  useEffect(() => {
    if (!id) { 
      setState('missing'); 
      return; 
    }
    getProductById(id)
      .then((p) => { 
        if (p) { 
          setProduct(p); 
          setState('ok'); 
        } else { 
          setState('missing'); 
        } 
      })
      .catch(() => setState('missing'));
  }, [id]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen pt-32 text-center text-neutral-500 font-['Poppins'] uppercase tracking-widest text-sm animate-pulse">
        Učitavanje detalja...
      </div>
    );
  }

  if (state === 'missing' || !product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="font-['Poppins'] text-xl font-black uppercase tracking-widest text-black mb-2">
          Artikal nije pronađen
        </h2>
        <p className="text-sm text-neutral-500 font-medium">
          Komad koji tražite više nije dostupan ili je link nevažeći.
        </p>
      </div>
    );
  }

  return <ProductDetailPage product={product} />;
}

export default function ProductPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen pt-32 text-center text-neutral-500 font-['Poppins'] uppercase tracking-widest text-sm animate-pulse">
          Učitavanje...
        </div>
      }
    >
      <ProductLoader />
    </Suspense>
  );
}