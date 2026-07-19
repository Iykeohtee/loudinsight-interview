import { getUsers } from "../lib/api/users";
import { UserTable } from "../components/dashboard/UserTable";

interface DashboardPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams; // Next.js 15+ — searchParams is a Promise

  const page = Number(params.page) || 1;
  const limit = 8; // matches the 8-per-page shown in the Figma

  const data = await getUsers({
    q: params.q,
    limit,
    skip: (page - 1) * limit,
    sortBy: params.sortBy ?? "id",
    order: params.order ?? "desc", // default "Newest" from our README assumption
  });

  return (
    <div className="p-8">
      <UserTable
        users={data.users}
        total={data.total}
        page={page}
        limit={limit}
      />
    </div>
  );
}
