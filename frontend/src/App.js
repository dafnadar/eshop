import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import { Store } from "./store";

function App() {
  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-fullPage">
        <header className="header">
          {/* move navbar to component */}
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>EShop</Navbar.Brand>
              </LinkContainer>
              <nav className="ms-auto w-50 justify-content-end">
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart text-white"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </nav>
            </Container>
          </Navbar>
        </header>
        {/* make Header component */}
        {/* <Header/> */}
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        {/* make Footer component */}
        {/* <Footer/> */}
        <footer>
          <div className="small text-muted text-center">
            All Rights Reserved © 2023. 
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
