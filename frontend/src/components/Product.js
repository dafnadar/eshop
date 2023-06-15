import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";

function Product(props) {
  const { product } = props;

  return (
    <Card className="product-card">
      <div className="">
      <Link to={`/product/${product.token}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      </div>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price}$</Card.Text>
        <Card.Text className="desc">{product.description}</Card.Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
