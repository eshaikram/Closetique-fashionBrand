import Link from 'next/link';

const DesktopNavLinks = () => (
 <div className="flex items-center text-xl ml-10 space-x-6 text-white">
  <Link href="/best-selling" className="hover:text-orange-500">Best Selling</Link>
  <Link href="/top-rated" className="hover:text-orange-500">Top Rated</Link>
  <Link href="/new-arrivals" className="hover:text-orange-500">New Arrivals</Link>
  <div className="relative group">
    <Link href="/categories" className="hover:text-orange-500">Categories</Link>
    <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 p-2 z-10 text-black">
      <Link href="/mens" className="block px-4 py-2 hover:bg-gray-100">Men's</Link>
      <Link href="/womens" className="block px-4 py-2 hover:bg-gray-100">Women's</Link>
    </div>
  </div>
</div>

);

export default DesktopNavLinks;
