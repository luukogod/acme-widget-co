import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToBasket: (productCode: string) => void;
}

export const ProductCard = ({ product, onAddToBasket }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className={`product-card-hero product-hero-${product.code.toLowerCase()}`}>
      </div>
      <div className="product-card-content">
        <span className="product-code">{product.code}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          className="btn btn-add-to-basket"
          onClick={() => onAddToBasket(product.code)}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
};