'use client';
import AdminTable from "@/components/ResueableComponents/AdminTable";

const columns = [
  { header: 'Product', accessorKey: 'productName' },
  { header: 'SKU', accessorKey: 'sku' },
  { header: 'Quantity', accessorKey: 'quantity' },
  { header: 'Warehouse', accessorKey: 'warehouse' },
];

export default function StocksPage() {
  return <AdminTable title="Stock Overview" fetchUrl="/api/admin/stocks" columns={columns} />;
}
