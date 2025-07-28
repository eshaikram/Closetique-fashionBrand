"use client";
import React from 'react';

const ActionButtons = ({ onEdit, onDelete }) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      alert('Edit action not implemented yet.');
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      alert('Delete action not implemented yet.');
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleEdit}
        className="text-blue-500 hover:text-blue-700 focus:outline-none"
        aria-label="Edit"
      >
        ✏️
      </button>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 focus:outline-none"
        aria-label="Delete"
      >
        🗑️
      </button>
    </div>
  );
};

export default ActionButtons;