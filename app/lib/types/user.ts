export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: {
    city: string;
    country: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetUsersParams {
  q?: string;
  limit: number;
  skip: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
