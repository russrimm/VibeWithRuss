import * as React from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const HomePage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [editingProduct, setEditingProduct] = React.useState<any | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState<{ id: string; name: string } | null>(null);

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

  // Delete product handler
  const handleDeleteProduct = async (id: string) => {
    setShowConfirmDelete(null);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Error deleting product');
    }
  };

  // Edit product handler
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

  // Update product handler
  const handleProductUpdated = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white text-center text-2xl font-bold shadow">Product Photo Gallery</header>
      <main className="p-8">
        {editingProduct ? (
          <ProductForm
            key={editingProduct.id}
            onProductAdded={handleProductUpdated}
            initialProduct={editingProduct}
            mode="edit"
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <ProductForm onProductAdded={fetchProducts} />
        )}
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
              onEdit={() => handleEditProduct(product)}
              onDelete={() => setShowConfirmDelete({ id: product.id, name: product.name })}
            />
          ))}
        </div>
        {!loading && products.length === 0 && !error && (
          <div className="text-center text-gray-500">No products found.</div>
        )}
        {/* Delete confirmation dialog */}
        {showConfirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center">
              <div className="text-lg font-semibold mb-4 text-center">Delete <span className="text-red-600">{showConfirmDelete.name}</span>?</div>
              <div className="flex gap-4 mt-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                  onClick={() => setShowConfirmDelete(null)}
                >Cancel</button>
                <button
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
                  onClick={() => handleDeleteProduct(showConfirmDelete.id)}
                >Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage; 