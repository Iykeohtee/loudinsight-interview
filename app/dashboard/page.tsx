import { getUsers } from "../lib/api/users";
import { UserTable } from "../components/dashboard/UserTable";
import { SearchInput } from "../components/dashboard/SearchInput";
import { Pagination } from "../components/dashboard/Pagination";

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
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 8;

  const data = await getUsers({
    q: params.q,
    limit,
    skip: (page - 1) * limit,
    sortBy: params.sortBy ?? "id",
    order: params.order ?? "desc",
  });

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">All Customers</h2>
          <span className="text-xs text-indigo-600">Active Members</span>
        </div>
        <SearchInput />
      </div>

      <UserTable users={data.users} />

      <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
        <p>
          Showing data {data.skip + 1} to{" "}
          {Math.min(data.skip + limit, data.total)} of{" "}
          {data.total.toLocaleString("en-US")} entries
        </p>
        <Pagination
          page={page}
          totalPages={totalPages}
          searchParams={{
            q: params.q,
            sortBy: params.sortBy,
            order: params.order,
          }}
        />
      </div>
    </div>
  );
}
