import Link from 'next/link';

const MobileNavLinks = ({ toggleMobileMenu, isCategoriesOpen, toggleCategories }) => (
 <div className="flex flex-col space-y-4 px-6 py-4 text-white">
    {['/best-selling', '/top-rated', '/new-arrivals'].map((link, idx) => (
      <Link key={idx} href={link} onClick={toggleMobileMenu} className="hover:text-orange-500 capitalize">
        {link.split('/')[1].replace('-', ' ')}
      </Link>
    ))}

    <div>
      <button onClick={toggleCategories} className="flex items-center hover:text-orange-500 w-full text-left">
        Categories
        <svg className={`w-4 h-4 ml-2 transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isCategoriesOpen && (
        <div className="pl-4 mt-2 space-y-2">
          <Link href="/mens" onClick={toggleMobileMenu} className="block hover:text-orange-500">Men's</Link>
          <Link href="/womens" onClick={toggleMobileMenu} className="block hover:text-orange-500">Women's</Link>
        </div>
      )}
    </div>
  </div>
);

export default MobileNavLinks;
