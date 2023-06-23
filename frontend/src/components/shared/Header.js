import {
    Container,
    Link,
    Badge,
    LinkContainer,
    NavBar,
    axios,
    useContext,
    Store,
    addToCartHandler,
    NavDropdown,
    USER_SIGNOUT,
} from "../../Imports";

function Header() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
        cart,
        userInfo,
    } = state;

    //Cancels out default behaviour when the mouse is on the cart-icon
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    //When item card is dragged to the icon, it add it to the cart (provided it is in-stock).
    const handleDrop = async (event) => {
        event.preventDefault();

        //Gets the item-id from the dragged item.
        const productId = event.dataTransfer.getData("text/plain");

        const { data } = await axios.get(`/api/v1/products/${productId}`);

        await addToCartHandler(data, cartItems, ctxDispatch);
    };

    const signoutHandler = () => {
        ctxDispatch({ type: USER_SIGNOUT });
        localStorage.removeItem("userInfo");
    };

    return (
        <div>
            <header className="header">
                <NavBar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <NavBar.Brand>Eshop</NavBar.Brand>
                        </LinkContainer>
                        <nav
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="d-flex mx-auto align-items-center"
                        >
                            <Link to="/cart" className="nav-link">
                                <i className="fas fa-shopping-cart text-white"></i>
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg="danger">
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </Badge>
                                )}
                            </Link>
                        </nav>
                        {userInfo ? (
                            <NavDropdown className='text-white' title={userInfo.name} id='basic-nav-dropdown' >
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        User Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/orderhistory'>
                                    <NavDropdown.Item>
                                        Order History
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <Link onClick={signoutHandler} to='#signout' className='dropdown-item'>Sign Out</Link>
                            </NavDropdown>

                        ) : (
                            <Link className='nav-link text-white' to='/signin'>Sign In </Link>
                        )}
                    </Container>
                </NavBar>
            </header>
        </div>
    );
}
export default Header;
