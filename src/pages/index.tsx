import * as React from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const HomePage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Error loading products');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white text-center text-2xl font-bold shadow">Product Photo Gallery</header>
      <main className="p-8">
        <ProductForm onProductAdded={fetchProducts} />
        {loading && <div className="text-center text-gray-500">Loading products...</div>}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
              category={product.category}
              onAddToCart={() => alert(`Added ${product.name} to cart!`)}
            />
          ))}
        </div>
        {!loading && products.length === 0 && !error && (
          <div className="text-center text-gray-500">No products found.</div>
        )}
      </main>
    </div>
  );
};

export default HomePage; 