import { useState, useMemo, useCallback } from 'react';
import { products, deliveryRules, offers } from './lib/catalogue'
export { ProductCard } from './components/ProductCard'
export { BasketDisplay } from './components/BasketDisplay';
import { Basket } from './lib/Basket';
import { ProductCard } from './components/ProductCard';
import { BasketDisplay } from './components/BasketDisplay';
import './App.css'

function App() {

  // Basket state - stores items and breakdown for rendering
  const [basketData, setBasketData] = useState(() => {
    const basket = new Basket(products, deliveryRules, offers);
    return {
      items: basket.getItems(),
      breakdown: basket.getBreakdown(),
    };
  });
   // Basket instance - memoized to persist across renders
   const basket = useMemo(
    () => new Basket(products, deliveryRules, offers),
    []
  );

  /**
   * Update basket data state
   */
  const updateBasketData = useCallback(() => {
    setBasketData({
      items: basket.getItems(),
      breakdown: basket.getBreakdown(),
    });
  }, [basket]);

  /**
   * Add product handler
   * Memoized to prevent ProductCard re-renders
   */
  const handleAddProduct = useCallback((productCode: string) => {
    basket.add(productCode);
    updateBasketData();
  }, [basket, updateBasketData]);

  /**
   * Remove product handler
   * Memoized to prevent BasketItemRow re-renders
   */
  const handleRemoveProduct = useCallback((productCode: string) => {
    basket.remove(productCode);
    updateBasketData();
  }, [basket, updateBasketData]);

  /**
   * Clear basket handler
   * Memoized to prevent BasketDisplay re-renders
   */
  const handleClearBasket = useCallback(() => {
    basket.clear();
    updateBasketData();
  }, [basket, updateBasketData]);

  /**
   * Product list
   * Memoized to prevent recalculation on every render
   */
  const productList = useMemo(
    () => Object.values(products),
    []
  );
 
  return (
    <div>
      <header>
        <div>
          <h1>
               Acme Widget Co
          </h1>
        </div>
      </header>

      <main>
        <section>
          <h2>Products</h2>
          <div>
            {productList.map((product) => (
                <ProductCard
                  key={product.code}
                  product={product}
                  onAddToBasket={handleAddProduct}
                />
              ))}
          </div>          
        </section>

        <aside>
        <BasketDisplay
          items={basketData.items}
          breakdown={basketData.breakdown}
          onRemoveProduct={handleRemoveProduct}
          onClearBasket={handleClearBasket}
          onAddProduct={handleAddProduct}
        />
        </aside>
      </main>

      <footer>
        <p>Aceme widget co. 2026, made with ❤️ by Kan Chan for coding assesments</p>
      </footer>
    </div>
  );
}

export default App;
