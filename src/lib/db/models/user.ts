export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  preferences: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  settings: UserSettings;
  roles: string[];
  type: 'user';
}

export interface CreateUserInput {
  email: string;
  password: string;
  settings?: Partial<UserSettings>;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  settings?: Partial<UserSettings>;
  isActive?: boolean;
  roles?: string[];
} 