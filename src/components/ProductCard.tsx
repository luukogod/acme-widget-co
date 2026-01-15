import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToBasket: (productCode: string) => void;
}

export const ProductCard = ({ product, onAddToBasket }: ProductCardProps) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Code: {product.code}</p>
      <p>${product.price.toFixed(2)}</p>
      <button 
        onClick={() => onAddToBasket(product.code)}
      >
        Add to Basket
      </button>
    </div>
  );
};