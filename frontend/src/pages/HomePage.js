import { Link } from 'react-router-dom';
import data from '../data';

function HomePage() {
  return (
      <div>
          <h1>Products</h1>
          <div className="products">
            {data.products.map((product) => (
              <div className="product" key={product.token}>
                <Link to={`/product/${product.token}`}>
                  <img alt={product.name} src={product.image}></img>
                </Link>
                <div className="product-desc">
                  <Link to={`/product/${product.token}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>{product.price}$</strong>
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
      </div>
  );
}

export default HomePage;
