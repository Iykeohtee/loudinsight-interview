import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { StatsCards } from "../components/layout/StatsCard";
import { getUsers } from "../lib/api/users";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // fetched here so the total customer count is real, not hardcoded
  const { total } = await getUsers({ limit: 1, skip: 0 });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-8">
          <StatsCards totalCustomers={total} />
          {children}
        </main>
      </div>
    </div>
  );
}