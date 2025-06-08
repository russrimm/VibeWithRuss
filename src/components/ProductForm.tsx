import React, { useState, useEffect } from 'react';

interface ProductFormProps {
  onProductAdded: () => void;
  initialProduct?: any;
  mode?: 'add' | 'edit';
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded, initialProduct, mode = 'add', onCancel }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialProduct) {
      setName(initialProduct.name || '');
      setImage(initialProduct.image || '');
      setPrice(initialProduct.price || '');
      setDescription(initialProduct.description || '');
      setCategory(initialProduct.category || '');
    } else if (mode === 'add') {
      setName('');
      setImage('');
      setPrice('');
      setDescription('');
      setCategory('');
    }
  }, [initialProduct, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let res;
      if (mode === 'edit' && initialProduct?.id) {
        res = await fetch(`/api/products/${initialProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, image, price, description, category }),
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, image, price, description, category }),
        });
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save product');
      }
      setName('');
      setImage('');
      setPrice('');
      setDescription('');
      setCategory('');
      onProductAdded();
    } catch (err: any) {
      setError(err.message || 'Error saving product');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 max-w-xs mx-auto flex flex-col gap-4 border border-gray-100"
      aria-label={mode === 'edit' ? 'Edit Product Form' : 'Add Product Form'}
    >
      <h2 className="text-xl font-extrabold mb-1 text-center tracking-tight text-gray-900">
        {mode === 'edit' ? 'Edit Product' : 'Add a New Product'}
      </h2>
      {error && <div className="text-red-600 text-xs mb-1 text-center">{error}</div>}
      <div className="flex flex-col gap-2">
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 transition-all shadow-sm"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          aria-label="Product Name"
        />
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 transition-all shadow-sm"
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
          aria-label="Image URL"
        />
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 transition-all shadow-sm"
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          aria-label="Category"
        />
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 transition-all shadow-sm"
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          aria-label="Price"
        />
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 transition-all shadow-sm min-h-[48px] resize-none"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          aria-label="Description"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2 w-full">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl px-4 py-2 shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all text-base disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (mode === 'edit' ? 'Saving...' : 'Adding...') : (mode === 'edit' ? 'Save Changes' : 'Add Product')}
        </button>
        {mode === 'edit' && onCancel && (
          <button
            type="button"
            className="w-full bg-gray-200 text-gray-700 font-bold rounded-xl px-4 py-2 shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all text-base"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm; 