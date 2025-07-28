"use client";
import React, { useState, useEffect } from 'react';
import AdminTable from "@/components/ResueableComponents/AdminTable";
import AddProductPopup from '@/components/Popup-Pages/AddProductPopup';
import axiosInstance from '@/lib/axiosInstance';

const columns = [
  { 
    header: 'ID', 
    accessorKey: '_id',
    cell: ({ row }) => row.original._id.slice(-6)
  },
  { 
    header: 'Image', 
    accessorKey: 'images',
    cell: ({ row }) => (
      row.original.images && row.original.images[0] ? (
        <img 
          src={row.original.images[0]} 
          alt={row.original.title} 
          className="w-12 h-12 object-cover rounded"
        />
      ) : 'No Image'
    )
  },
  { header: 'Product Name', accessorKey: 'title' },
  { header: 'Category', accessorKey: 'category' },
  { header: 'Brand', accessorKey: 'brand' },
  { 
    header: 'Price', 
    accessorKey: 'price',
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`
  },
  { header: 'Stock Quantity', accessorKey: 'countInStock' },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        row.original.status === 'In Stock' ? 'bg-green-100 text-green-800' :
        row.original.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {row.original.status}
      </span>
    )
  },
];

export default function ProductsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
      setSnackbar({
        open: true,
        message: 'Products loaded successfully',
        type: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to load products',
        type: 'error'
      });
    }
  };

  const handleAddProductClick = () => {
    setIsPopupOpen(true);
  };

  const handleProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]);
    setSnackbar({
      open: true,
      message: 'Product added successfully',
      type: 'success'
    });
  };

  const handleEdit = async (row) => {
    alert(`Editing ${row.original.title}. Implement edit form/modal.`);
  };

  const handleDelete = async (row) => {
    if (confirm(`Are you sure you want to delete ${row.original.title}?`)) {
      try {
        await axiosInstance.delete('/products', { data: { id: row.original._id } });
        setProducts(products.filter(p => p._id !== row.original._id));
        setSnackbar({
          open: true,
          message: 'Product deleted successfully',
          type: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || 'Failed to delete product',
          type: 'error'
        });
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="w-full p-2">
      <AdminTable
        title="Products"
        columns={columns}
        data={products}
        buttonLabel="Add Product"
        filters={['All', 'Men', 'Women', '2-Piece', '3-Piece', 'In Stock', 'Out Of Stock']}
        onButtonClick={handleAddProductClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isPopupOpen && (
        <AddProductPopup 
          onClose={() => setIsPopupOpen(false)} 
          onProductAdded={handleProductAdded}
        />
      )}
      {snackbar.open && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
          snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {snackbar.message}
          <button
            onClick={handleSnackbarClose}
            className="ml-4 text-white font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}