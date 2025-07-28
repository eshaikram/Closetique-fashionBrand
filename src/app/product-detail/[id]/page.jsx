// app/product-detail/[id]/page.jsx
import React from 'react';

const mockProducts = [
  { id: '1', title: 'Black Denim Jacket', image: '/products/jacket.jpg', price: 59.99, description: 'Stylish black denim jacket.' },
  { id: '2', title: 'Classic White Shirt', image: '/products/shirt.jpg', price: 29.99, description: 'Crisp white shirt for any occasion.' },
  { id: '3', title: 'Summer Floral Dress', image: '/products/dress.jpg', price: 45.00, description: 'Light and breezy summer floral dress.' },
  { id: '4', title: 'Unique Floral Skirt', image: '/products/skirt.jpg', price: 39.99, description: 'Colorful skirt for daily wear.' },
];

export default function ProductDetailPage({ params }) {
  const { id } = params;

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={product.image} alt={product.title} className="w-full h-96 object-cover rounded-xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-orange-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
