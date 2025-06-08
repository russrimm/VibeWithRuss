import * as React from 'react';

type ProductCardProps = {
  name: string;
  image: string;
  price: string;
  description?: string;
  category?: string;
  onAddToCart?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price, description, category, onAddToCart }) => (
  <div
    className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-transform duration-200 relative group focus-within:ring-2 focus-within:ring-blue-400"
    tabIndex={0}
    aria-label={`Product card for ${name}`}
  >
    <img
      src={image}
      alt={name}
      className="w-48 h-48 object-cover rounded mb-4 border border-gray-200 group-hover:opacity-90 transition-opacity"
    />
    {category && (
      <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
        {category}
      </span>
    )}
    <div className="font-semibold text-lg mb-1 text-center">{name}</div>
    {description && <div className="text-gray-500 text-sm mb-2 text-center line-clamp-2">{description}</div>}
    <div className="text-blue-600 font-bold text-lg mb-2">${price}</div>
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