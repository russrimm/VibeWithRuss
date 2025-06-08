import { container } from '../cosmos';
import { User, CreateUserInput, UpdateUserInput } from '../models/user';
import { hash } from 'bcryptjs';

export class UserRepository {
  async createUser(input: CreateUserInput): Promise<User> {
    const passwordHash = await hash(input.password, 10);
    
    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      passwordHash,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
      settings: {
        theme: 'light',
        notifications: true,
        preferences: {},
        ...input.settings,
      },
      roles: ['user'],
      type: 'user',
    };

    const { resource } = await container.items.create(user);
    return resource as unknown as User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query = {
      query: 'SELECT * FROM c WHERE c.email = @email AND c.type = "user"',
      parameters: [{ name: '@email', value: email }],
    };

    const { resources } = await container.items.query(query).fetchAll();
    return (resources[0] as unknown as User) || null;
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) return null;

    const updates: Partial<User> = {
      ...input,
      settings: input.settings ? {
        ...user.settings,
        ...input.settings,
      } : user.settings,
    };
    
    if (input.password) {
      updates.passwordHash = await hash(input.password, 10);
    }

    const { resource } = await container.item(id).replace({
      ...user,
      ...updates,
    });

    return resource as unknown as User;
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const { resource } = await container.item(id).read();
      return resource as unknown as User;
    } catch (error) {
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await container.item(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
} 