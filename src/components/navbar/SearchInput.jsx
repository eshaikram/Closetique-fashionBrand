import { Search } from 'lucide-react';

const SearchInput = ({ query, setQuery, onSubmit }) => (
  <form onSubmit={onSubmit} className="relative w-64 mr-10">
    <input
      type="text"
      placeholder="Search clothing..."
      className="w-full p-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-white bg-black"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white" aria-label="Search">
      <Search className="w-5 h-5" />
    </button>
  </form>
);

export default SearchInput;