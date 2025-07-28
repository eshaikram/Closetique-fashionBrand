"use client";
import React, { useState } from 'react';

const FilterButtons = ({ filters = [] }) => {
  const [active, setActive] = useState(filters[0]);

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => setActive(filter)}
          className={`w-[120px] h-[33px] text-sm font-semibold text-center px-1 py-1 rounded-full border transition duration-200 cursor-pointer whitespace-nowrap
            ${active === filter
              ? 'bg-orange-500 text-white border-orange-500'
              : 'bg-white text-black border-gray-300'
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
