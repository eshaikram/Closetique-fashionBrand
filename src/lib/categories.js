// Shared category list used by the navbar, browse dropdown, product
// filtering and the homepage. `slug` matches the format produced by
// CategoryCard so links stay consistent across the app.
export const CATEGORIES = [
  "Women",
  "Men",
  "Kids",
  "Dresses",
  "Lawn Collection",
  "Formal Wear",
  "Casual Wear",
  "Accessories",
  "Footwear",
  "New Arrivals",
];

export const toSlug = (title) =>
  title.toLowerCase().trim().replace(/\s+/g, "-");

export const fromSlug = (slug) =>
  CATEGORIES.find((c) => toSlug(c) === slug) || null;
