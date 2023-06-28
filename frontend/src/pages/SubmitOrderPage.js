import { toast } from "react-toastify";
import React, { useReducer } from "react";
import {
    CheckoutSteps, Title, Row, Col, Card, Store, useContext, Link, ListGroup, Button, useEffect, useNavigate, getError, axios, Loading
} from "../Imports";

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "CREATE_REQUEST":
            return { ...state, loading: true }
        case "CREATE_SUCCEEDED":
            return { ...state, loading: false }
        case "CREATE_FAILED":
            return { ...state, loading: false }
        default:
            return state
    }
};

const SubmitOrderPage = () => {

    const [{ loading }, dispatch] = useReducer(reducer, { loading: false });



    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const { paymentMethod } = cart;


    const submitOrderHandler = async () => {
        
        try {
            dispatch({type: "CREATE_REQUEST"});
            const {data} = await axios.post("/api/v1/orders", {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }, {
                headers: {authorization: `Bearer ${userInfo.token} `}
            })

            dispatch({type: "CREATE_SUCCEEDED"});
            // upade global state - empty the cart after sending data to server            
            ctxDispatch({type: "CLEAR_CART"});
            localStorage.removeItem("cartItems");
            navigate(`/order/${data.order._id}`);
            
        } catch (err) {
            dispatch({type: "CREATE_FAILED"});
            //toast.error(getError(err));
            alert((err.message));
        }
    }

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))
    cart.taxPrice = round2(cart.itemsPrice * 0.17);
    cart.shippingPrice = cart.itemsPrice > 50 ? round2(cart.itemsPrice * 0.01) : round2(cart.itemsPrice * 0.02)
    cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        }

    }, [cart, navigate, paymentMethod])

    return (
        <div>
            <Title title="Order Summary" />
            <CheckoutSteps step1 step2 step3 step4 />
            <h1 className="my-3">Order Summary</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping </Card.Title>
                            <Card.Text>
                                <strong>Name: </strong>
                                {cart.shippingAddress.fullName}
                                <br />
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}
                                <br />
                                <strong>City: </strong>
                                {cart.shippingAddress.city}
                                <br />
                                <strong>Country: </strong>
                                {cart.shippingAddress.country}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment </Card.Title>
                            <Card.Text>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                                <br />
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items </Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="img-fluid rounded img-thumbnail"
                                                />{" "}
                                                <div>
                                                    <Link to={`/product/${item.token}`}>
                                                        {item.title}{" "}
                                                    </Link>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.price}</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to="/cart">Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Summary: </Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items: </Col>
                                        <Col> ${cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping: </Col>
                                        <Col> ${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax: </Col>
                                        <Col> ${cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total: </Col>
                                        <Col>
                                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            onClick={submitOrderHandler}
                                            disabled={cart.cartItems.lenght === 0}
                                        >Submit</Button>
                                    </div>
                                    {loading && <Loading/>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SubmitOrderPage;
