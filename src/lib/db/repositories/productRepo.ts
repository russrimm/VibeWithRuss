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
} 