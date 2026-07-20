"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useTransition } from "react";
import { Search } from "lucide-react";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      params.set("page", "1"); // reset to page 1 whenever the search term changes

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  return (
    <div className="flex items-center gap-2 bg-white border border-black/60 rounded-lg px-3 py-2 text-sm w-64">
      <Search size={16} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="outline-none flex-1 text-black text-sm placeholder:text-black/50"
      />
      {isPending && <span className="text-xs text-gray-400">···</span>}
    </div>
  );
}
