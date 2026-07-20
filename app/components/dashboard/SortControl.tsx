"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", sortBy: "id", order: "desc" },
  { label: "Oldest", sortBy: "id", order: "asc" },
  { label: "Name A-Z", sortBy: "firstName", order: "asc" },
  { label: "Name Z-A", sortBy: "firstName", order: "desc" },
] as const;

export function SortControl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") ?? "id";
  const currentOrder = searchParams.get("order") ?? "desc";
  const current =
    SORT_OPTIONS.find(
      (o) => o.sortBy === currentSortBy && o.order === currentOrder,
    ) ?? SORT_OPTIONS[0];

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = SORT_OPTIONS.find((o) => o.label === e.target.value);
    if (!selected) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", selected.sortBy);
    params.set("order", selected.order);
    params.set("page", "1"); // reset to page 1 on sort change

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>Sort by :</span>
      <div className="relative">
        <select
          value={current.label}
          onChange={handleChange}
          className="appearance-none bg-transparent font-medium text-gray-700 pr-5 outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.label} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
        />
      </div>
    </div>
  );
}
