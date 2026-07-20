export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 bg-gray-100 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}