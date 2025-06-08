export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'product';
} 