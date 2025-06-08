import React, { useState } from 'react';

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image, price, description, category }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add product');
      }
      setName('');
      setImage('');
      setPrice('');
      setDescription('');
      setCategory('');
      onProductAdded();
    } catch (err: any) {
      setError(err.message || 'Error adding product');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 max-w-xl mx-auto flex flex-col gap-4" aria-label="Add Product Form">
      <h2 className="text-xl font-bold mb-2 text-center">Add a New Product</h2>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <input
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        aria-label="Product Name"
      />
      <input
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
        required
        aria-label="Image URL"
      />
      <input
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        aria-label="Category"
      />
      <input
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        aria-label="Price"
      />
      <textarea
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        aria-label="Description"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm; 