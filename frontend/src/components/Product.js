import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  //TODO: hadle errors

  const addToCartHandler = async () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    
    ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  };

  return (
    <Card className="product-card">
      {/* <Link to={`/product/${product.token}`}>
          <Card.Img variant="top" src={product.image} alt={product.name}/>
        </Link> */}
      <div className="card-img-wrapper">
        <Link to={`/product/${product.token}`}>
          <img
            className="card-img-top card-img"
            src={product.image}
            alt={product.name}
          />
        </Link>
      </div>
      <Card.Body className="card-info">
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price}$</Card.Text>
        <Card.Text className="desc">{product.description}</Card.Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button variant="primary" onClick={() => addToCartHandler(product)}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
