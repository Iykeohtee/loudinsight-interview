import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  searchParams: { q?: string; sortBy?: string; order?: string };
}

function buildHref(
  targetPage: number,
  params: PaginationProps["searchParams"],
) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.sortBy) sp.set("sortBy", params.sortBy);
  if (params.order) sp.set("order", params.order);
  sp.set("page", String(targetPage));
  return `/dashboard?${sp.toString()}`;
}

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) pages.push(p);

  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

export function Pagination({
  page,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center gap-1">
      <Link
        href={buildHref(Math.max(1, page - 1), searchParams)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
          page === 1
            ? "pointer-events-none text-gray-300"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <ChevronLeft size={16} />
      </Link>

      {getPageList(page, totalPages).map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className="w-8 h-8 flex items-center justify-center text-gray-400"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p, searchParams)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
              p === page
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={buildHref(Math.min(totalPages, page + 1), searchParams)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
          page === totalPages
            ? "pointer-events-none text-gray-300"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
