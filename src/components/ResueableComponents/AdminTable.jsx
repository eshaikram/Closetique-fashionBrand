"use client";
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import FilterButtons from './FilterButtons';
import ActionButtons from './ActionButtons';

export default function AdminTable({ title, columns, data, buttonLabel, filters = ['All', 'Men', 'Women', 'Unstitched 2-Piece', 'Unstitched 3-Piece', 'Thongs'], onButtonClick, onEdit, onDelete }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-6 bg-white rounded-xl border shadow-md">
      <div className="flex flex-wrap items-center gap-20 mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <FilterButtons filters={filters} />
      </div>
      <div className="w-full mt-10 mb-4 text-right">
        {buttonLabel && (
          <button
            onClick={onButtonClick}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg mb-4"
          >
            {buttonLabel}
          </button>
        )}
        <div className="flex space-x-4 mt-2 text-right justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search all columns..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg border border-gray-300 shadow-sm">Clear Filters</button>
        </div>
      </div>
      <div className="w-full overflow-x-auto min-h-[300px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <input
                      type="text"
                      placeholder={`Filter ${header.column.columnDef.header}...`}
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-3 text-center">No data available</td></tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <ActionButtons
                      onEdit={() => onEdit(row)}
                      onDelete={() => onDelete(row)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="w-full flex items-center justify-between mt-4">
          <span>Rows per page 10 <select className="ml-2 border border-gray-300 rounded-lg shadow-sm">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select> 1-{Math.min(10, data.length)} of {data.length}</span>
          <div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}