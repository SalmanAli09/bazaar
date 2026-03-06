import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { User } from './database';

const DB_FILE = join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
import { mkdirSync } from 'fs';
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// File-based database functions
export function loadUsers(): User[] {
  try {
    if (existsSync(DB_FILE)) {
      const data = readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

export function saveUsers(users: User[]): void {
  try {
    writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

export function findUserByEmail(email: string): User | undefined {
  const users = loadUsers();
  return users.find(user => user.email === email);
}

export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const users = loadUsers();
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}
