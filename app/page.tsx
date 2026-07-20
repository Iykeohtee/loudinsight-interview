import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 font-sans">
      <main className="w-full max-w-4xl bg-white rounded-2xl p-10 shadow-sm">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-black/70">
              Customer Management Dashboard
            </h1>

            <p className="mt-3 text-sm text-gray-400 max-w-md">
              Manage customers, search users, sort records, and navigate through
              your customer database efficiently.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="
              flex items-center justify-center
              rounded-lg
              bg-black
              px-8
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-black/80
            "
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-black/10 p-5">
            <h3 className="text-sm font-semibold text-black/70">Customers</h3>
            <p className="mt-2 text-xs text-gray-400">
              View and manage customer records.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 p-5">
            <h3 className="text-sm font-semibold text-black/70">Search</h3>
            <p className="mt-2 text-xs text-gray-400">
              Quickly find users using filters.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 p-5">
            <h3 className="text-sm font-semibold text-black/70">Analytics</h3>
            <p className="mt-2 text-xs text-gray-400">
              Track customer information easily.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
