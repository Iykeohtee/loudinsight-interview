export default function DashboardLoading() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-9 w-64 bg-gray-100 rounded-lg" />
          <div className="h-5 w-24 bg-gray-100 rounded" />
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            {['Customer Name', 'Gender', 'Phone Number', 'Email', 'Country', 'Status'].map((h) => (
              <th key={h} className="py-3">
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="border-b last:border-0">
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="py-4">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-6">
        <div className="h-3 w-40 bg-gray-100 rounded" />
        <div className="h-8 w-48 bg-gray-100 rounded" />
      </div>
    </div>
  );
}