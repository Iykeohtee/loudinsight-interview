import { GetUsersParams, UsersResponse } from "../types/user";

const FIELDS = 'firstName,lastName,email,phone,address';

export async function getUsers({ q, limit, skip, sortBy, order }: GetUsersParams): Promise<UsersResponse> {
  const base = q
    ? `https://dummyjson.com/users/search?q=${encodeURIComponent(q)}`
    : `https://dummyjson.com/users`;

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: FIELDS,
  });

  if (sortBy) params.set('sortBy', sortBy);
  if (order) params.set('order', order);

  const res = await fetch(`${base}?${params.toString()}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json();
}