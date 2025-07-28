'use client';
import AdminTable from "@/components/ResueableComponents/AdminTable";

const columns = [
  { header: 'Order ID', accessorKey: '_id' },
  { header: 'Customer', accessorKey: 'customerName' },
  { header: 'Total', accessorKey: 'totalAmount' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Date', accessorKey: 'createdAt' },
];

export default function OrdersPage() {
  return <AdminTable title="Customer Orders" fetchUrl="/api/admin/orders" columns={columns} />;
}
