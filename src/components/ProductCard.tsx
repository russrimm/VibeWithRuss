import * as React from 'react';

type ProductCardProps = {
  name: string;
  image: string;
  price: string;
  description?: string;
  onAddToCart?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price, description, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-shadow">
    <img src={image} alt={name} className="w-48 h-48 object-cover rounded mb-4 border border-gray-200" />
    <div className="font-semibold text-lg mb-1 text-center">{name}</div>
    <div className="text-gray-500 text-sm mb-2 text-center">{description}</div>
    <div className="text-blue-600 font-bold text-lg mb-2">{price}</div>
    <button
      className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={onAddToCart}
      aria-label={`Add ${name} to cart`}
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onAddToCart?.(); }}
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard; 