/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import './App.css';

function Item({ value, id, removeProduct }) {
  const image = useRef(null);
  return (
    <div className="item">
      <li key={id}>{value}</li>
      <button
        className="remove-button"
        onClick={() => {
          removeProduct(id);
        }}
      >
        <img src="../src/images/delete-icon.png" alt="close icon" ref={image} />
      </button>
    </div>
  );
}

function List({ products, removeProduct }) {
  return (
    <div className="list-panel wrapper">
      <ol>
        {products.map((product) => {
          return (
            <Item
              value={product.name}
              key={product.id}
              id={product.id}
              removeProduct={removeProduct}
            />
          );
        })}
      </ol>
    </div>
  );
}

function AddPanel({
  addProduct,
  setNewProductName,
  clearInput,
  newProductName,
}) {
  return (
    <div className="add-panel wrapper">
      <label>
        <input
          type="text"
          name="new-product"
          id="new-product"
          value={newProductName}
          placeholder="Enter product name:"
          onChange={(event) => {
            setNewProductName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addProduct();
              clearInput();
            }
          }}
        />
      </label>
      <button
        onClick={() => {
          addProduct();
          clearInput();
        }}
      >
        Add product
      </button>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(() => {
    let savedProducts = localStorage.getItem('products');
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            name: 'Strawberry',
          },
          {
            id: 2,
            name: 'Apple',
          },
        ];
  });
  const [newProductName, setNewProductName] = useState('');

  function addProduct() {
    if (
      newProductName.trim() === '' ||
      products.findIndex((product) => product.name === newProductName) != -1 ||
      newProductName.length >= 30
    )
      return;

    setProducts([
      ...products,
      { id: products.length + 1, name: newProductName },
    ]);
  }

  function removeProduct(id) {
    let updatedProducts = products.filter((product) => {
      return product.id != id;
    });
    setProducts(updatedProducts);
  }

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <main>
      <h2>To do List App</h2>
      <AddPanel
        addProduct={addProduct}
        setNewProductName={setNewProductName}
        clearInput={() => setNewProductName('')}
        newProductName={newProductName}
      />
      <List products={products} removeProduct={removeProduct} />
    </main>
  );
}

export default App;
