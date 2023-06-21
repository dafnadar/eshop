import { Container, Link, Badge, LinkContainer, NavBar, axios, useContext, Store, addToCartHandler } from '../../Imports';

function Header() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems }, cart } = state;

    //Cancels out default behaviour when the mouse is on the cart-icon
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    //When item card is dragged to the icon, it add it to the cart (provided it is in-stock).
    const handleDrop = async (event) => {
        event.preventDefault();

        //Gets the item-id from the dragged item.
        const productId = event.dataTransfer.getData('text/plain');

        const { data } = await axios.get(`/api/v1/products/${productId}`);
        
        await addToCartHandler(data,cartItems,ctxDispatch);
    };

    return (
        <div>
            <header className="header">
                <NavBar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <NavBar.Brand>Eshop</NavBar.Brand>
                        </LinkContainer>
                        <nav onDragOver={handleDragOver} onDrop={handleDrop} className='d-flex mx-auto align-items-center'>
                            <Link to='/cart' className='nav-link'>
                                <i className='fas fa-shopping-cart text-white'></i>
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg='danger'>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </Badge>
                                )}
                            </Link>
                        </nav>
                        <LinkContainer to="/signin">
                            <NavBar.Brand>Sign In</NavBar.Brand>
                        </LinkContainer>
                    </Container>
                </NavBar>
            </header>
        </div>
    )
}
export default Header