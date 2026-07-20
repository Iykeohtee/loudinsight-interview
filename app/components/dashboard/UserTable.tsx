import { User } from "@/app/lib/types/user";
import { getUserStatus } from "@/app/lib/utils/status";

interface UserTableProps {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export function UserTable({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p className="text-gray-500 py-8">No customers found.</p>;
  }

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-400 text-sm border-b">
          <th className="py-3">Customer Name</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Country</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const status = getUserStatus(user.id);
          return (
            <tr key={user.id} className="border-b last:border-0">
              <td className="py-4">
                {user.firstName} {user.lastName}
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>
                <span
                  className={
                    status === "Active"
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }
                >
                  {status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
