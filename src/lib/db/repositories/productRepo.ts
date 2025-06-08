import { container } from '../cosmos';
import { Product } from '../models/product';

export class ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const query = {
      query: 'SELECT * FROM c WHERE c.type = "product"',
    };
    const { resources } = await container.items.query(query).fetchAll();
    return resources as Product[];
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'type'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'product',
    };
    const { resource } = await container.items.create(newProduct);
    return resource as Product;
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const { resource } = await container.item(id).read();
      if (!resource || resource.type !== 'product') return null;
      return resource as Product;
    } catch (err) {
      return null;
    }
  }

  async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
    const existing = await this.getProductById(id);
    if (!existing) return null;
    const updated: Product = {
      ...existing,
      ...update,
      updatedAt: new Date(),
    };
    const { resource } = await container.item(id).replace(updated);
    return resource as Product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await container.item(id).delete();
      return true;
    } catch (err) {
      return false;
    }
  }
} 