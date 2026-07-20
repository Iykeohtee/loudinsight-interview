import { Suspense } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { StatsCardsContainer } from '../components/layout/StatsCardContainer';
import { StatsCardsSkeleton } from '../components/layout/StatsCardSkeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-8">
          <Suspense fallback={<StatsCardsSkeleton />}>
            <StatsCardsContainer />
          </Suspense>
          {children}
        </main>
      </div>
    </div>
  );
}