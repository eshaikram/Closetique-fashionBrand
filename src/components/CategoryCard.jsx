import React from 'react';

export default function CategoryCard({ title, image }) {
  return (
   <div className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition-transform duration-300">
  <div className="w-42 h-45 sm:w-45 sm:h-46 rounded-full overflow-hidden border border-gray-200 shadow-sm">
    <img
      src={image}
      className="w-full h-full object-cover"
    />

  </div>
  <span className="text-sm font-medium text-gray-800">{title}</span> {/* <-- AND this is below the image */}
</div>

  );
}
