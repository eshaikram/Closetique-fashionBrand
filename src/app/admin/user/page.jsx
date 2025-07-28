'use client';
import AdminTable from "@/components/ResueableComponents/AdminTable";

const columns = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Role', accessorKey: 'isAdmin', cell: ({ getValue }) => (getValue() ? 'Admin' : 'User') },
  { header: 'Created At', accessorKey: 'createdAt' },
];

export default function UsersPage() {
  return <AdminTable title="Registered Users" fetchUrl="/api/admin/users" columns={columns} />;
}
