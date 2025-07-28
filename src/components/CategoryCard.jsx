import React from 'react';

export default function CategoryCard({ title, image }) {
  return (
   <div className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition-transform duration-300">
  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-gray-200 shadow-sm">
    <img
      src={image}
      className="w-full h-full object-cover"
    />

  </div>
  <span className="text-sm font-medium text-gray-800">{title}</span> {/* <-- AND this is below the image */}
</div>

  );
}
