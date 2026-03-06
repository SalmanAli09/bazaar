// Mock database - In production, you'd use a real database like PostgreSQL, MongoDB, etc.
export interface User {
  id: string;
  fullName: string;
  email: string;
  cnic: string;
  password: string;
  isSeller: boolean;
  storeName?: string;
  pickupAddress?: string;
  address?: string;
  phoneNumber?: string;
  createdAt: string;
}

// This is a simple in-memory store that will reset on server restart
// In production, you'd use a proper database
export let users: User[] = [];

// Helper function to find user by email
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

// Helper function to create a new user
export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
}
