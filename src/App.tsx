import { useState, useMemo } from 'react';
import './App.css'

function App() {
 
  const handleAddProduct = () => {};

  const handleRemoveProduct = () => {};

  const handleClearBasket = () => {};


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
            Our products .....
          </div>          
        </section>

        <aside>
          <h2>Basket</h2>
          <div>
            Your basket is empty.
          </div>
        </aside>
      </main>

      <footer>
        <p>Aceme widget co. 2026, made with ❤️ by Kan Chan for coding assesments</p>
      </footer>
    </div>
  );
}

export default App;
