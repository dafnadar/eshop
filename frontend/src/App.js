import './App.css';
import {
  BrowserRouter, Routes, Route, HomePage, ProductPage, Container, useContext, Store, CartPage,
  SigninPage, Header, Footer, ToastContainer, SignupPage
} from './Imports';
import ShippingAddressPage from './pages/ShippingAddressPage';





function App() {
  // const { state } = useContext(Store);
  // const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <ToastContainer position='bottom-center' limit={1}/>
        <Header />
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
