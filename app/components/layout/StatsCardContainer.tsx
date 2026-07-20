import { getUsers } from '@/app/lib/api/users';
import { StatsCards } from './StatsCard';

export async function StatsCardsContainer() {
  let total = 0;
  let loadFailed = false;

  try {
    const data = await getUsers({ limit: 1, skip: 0 });
    total = data.total;
  } catch {
    // Deliberately swallowed: this backs a secondary stat, not the core
    // table. error.tsx doesn't cover layout.tsx in the same segment, so a
    // failure here is handled locally with a graceful fallback instead of
    // taking down the sidebar/topbar shell around it.
    loadFailed = true;
  }

  return <StatsCards totalCustomers={total} loadFailed={loadFailed} />;
}