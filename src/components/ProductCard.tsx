import * as React from 'react';

type ProductCardProps = {
  name: string;
  image: string;
  price: string;
  description?: string;
  category?: string;
  onAddToCart?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price, description, category, onAddToCart, onEdit, onDelete }) => (
  <div
    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 relative group focus-within:ring-2 focus-within:ring-blue-400 min-h-[420px] max-w-xs mx-auto border border-gray-100"
    tabIndex={0}
    aria-label={`Product card for ${name}`}
    style={{ minWidth: 280 }}
  >
    {/* Edit/Delete Buttons */}
    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10">
      {onEdit && (
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center gap-1"
          aria-label={`Edit ${name}`}
          tabIndex={0}
          onClick={onEdit}
          onKeyDown={e => { if (e.key === 'Enter') onEdit(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h2v2H7v-2h2zm0 0v-2h2v2H9z" /></svg>
          <span className="text-xs font-semibold">Edit</span>
        </button>
      )}
      {onDelete && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-1"
          aria-label={`Delete ${name}`}
          tabIndex={0}
          onClick={onDelete}
          onKeyDown={e => { if (e.key === 'Enter') onDelete(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          <span className="text-xs font-semibold">Delete</span>
        </button>
      )}
    </div>
    <div className="w-36 h-36 flex items-center justify-center mb-4 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
        style={{ aspectRatio: '1/1' }}
      />
    </div>
    {category && (
      <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
        {category}
      </span>
    )}
    <div className="font-semibold text-lg mb-1 text-center line-clamp-1 w-full">{name}</div>
    {description && <div className="text-gray-500 text-sm mb-2 text-center line-clamp-2 w-full">{description}</div>}
    <div className="text-blue-600 font-bold text-lg mb-2">${price}</div>
    <button
      className="mt-auto px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
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