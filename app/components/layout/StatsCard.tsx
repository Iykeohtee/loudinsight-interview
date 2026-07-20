import { Users, User, Monitor, ArrowUp, ArrowDown } from "lucide-react";

interface StatsCardsProps {
  totalCustomers: number;
  loadFailed?: boolean;
}

// Members / Active Now have no backing field in the DummyJSON API — there's no
// "membership" or "currently active" concept in the user data. Kept as static
// mock values matching the Figma, documented here and in the README rather
// than fabricated as if they were live.
const MEMBERS_MOCK = {
  value: "1,893",
  deltaPercent: 1,
  direction: "down" as const,
};
const ACTIVE_NOW_MOCK = { value: 189, avatarCount: 5 };

function formatTotal(n: number) {
  return n.toLocaleString("en-US");
}

export function StatsCards({ totalCustomers, loadFailed }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* Total Customers  */}
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Users size={22} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Total Customers</p>
          <p className="text-xl font-semibold">
            {loadFailed ? "—" : formatTotal(totalCustomers)}
          </p>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <ArrowUp size={12} /> 16% this month
          </p>
        </div>
      </div>

      {/* Members — static mock */}
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <User size={22} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Members</p>
          <p className="text-xl font-semibold">{MEMBERS_MOCK.value}</p>
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <ArrowDown size={12} /> {MEMBERS_MOCK.deltaPercent}% this month
          </p>
        </div>
      </div>

      {/* Active Now — static mock */}
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Monitor size={22} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Active Now</p>
          <p className="text-xl font-semibold">{ACTIVE_NOW_MOCK.value}</p>
          <div className="flex -space-x-2 mt-1">
            {Array.from({ length: ACTIVE_NOW_MOCK.avatarCount }).map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
