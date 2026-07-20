import { GetUsersParams, UsersResponse } from "../types/user";

const FIELDS = "firstName,lastName,gender,email,phone,address";

export async function getUsers({
  q,
  limit,
  skip,
  sortBy,
  order,
}: GetUsersParams): Promise<UsersResponse> {
  const endpoint = q
    ? "https://dummyjson.com/users/search"
    : "https://dummyjson.com/users";

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: FIELDS,
  });

  if (q) params.set("q", q);
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);

  const res = await fetch(`${endpoint}?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json();
}
