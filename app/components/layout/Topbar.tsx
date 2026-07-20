import { Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <h1 className="text-xl font-semibold text-black/50">Hello Evano 👋</h1>

      {/* Decorative only — not wired to any search logic.
          The functional search lives in SearchInput.tsx inside the customers card. */}
      <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 text-sm text-gray-400 w-64">
        <Search size={16} />
        <span>Search</span>
      </div>
    </header>
  );
}
