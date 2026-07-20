// This one must be client component. Nextjs requires error boundary to be client component since they reply on React-error boundary behaiour which is only available in client components.

"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // this would normally go to an error-tracking service (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center">
      <p className="text-lg font-semibold mb-1">Something went wrong</p>
      <p className="text-sm text-gray-400 mb-6">
        We couldn&apos;t load the customer list. Please try again.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
      >
        <RefreshCw size={14} />
        Try again
      </button>
    </div>
  );
}
