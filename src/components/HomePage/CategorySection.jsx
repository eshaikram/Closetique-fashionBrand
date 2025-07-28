import React from 'react';
import CategoryCard from '../CategoryCard';

const categories = [
  { title: 'Men', image: '/categories/men.jpg' },
  { title: 'Women', image: '/categories/women.jpg' },
  { title: 'Unstitched', image: '/categories/unstitch.jpg' },
  { title: '3 Piece', image: '/categories/3piece.jpg' },
  { title: '2 Piece', image: '/categories/2piece.jpg' },
  { title: '1 Piece', image: '/categories/1piece.jpg' },
  { title: 'Lawn Collection', image: '/categories/lawn.jpg' },
  { title: 'Khaddar Collection', image: '/categories/khaddar.jpg' },
  { title: 'Cotton Collection', image: '/categories/cotton.jpg' },
  { title: 'Linen Collection', image: '/categories/linen.jpg' },
  { title: 'Silk Suits', image: '/categories/silk.jpg' },
  { title: 'Wash & Wear', image: '/categories/washwear.jpg' },
  { title: 'Formal Wear', image: '/categories/formal.jpg' },
  { title: 'Casual Wear', image: '/categories/casual.jpg' },
  { title: 'Kids', image: '/categories/kids.jpg' },
  { title: 'New Arrivals', image: '/categories/new.jpg' },
  { title: 'Best Sellers', image: '/categories/bestsellers.jpg' },
  { title: 'Accessories', image: '/categories/accessories.jpg' },
];

export default function CategorySection() {
  return (
    <section className="py-7 px-4 max-w-7xl mx-auto">

      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((item, idx) => (
          <CategoryCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
