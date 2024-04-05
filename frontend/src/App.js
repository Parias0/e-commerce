import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import AccountPage from './pages/AccountPage';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import ResetPasswordRequestForm from './components/auth/ResetPasswordRequestForm';
import Cart from './components/cart/Cart';
import ContactDetailsForm from './components/order/ContactDetailsForm';
import OrderSummary from './components/order/OrderSummary';
import CheckoutForm from './components/order/CheckoutForm';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext'; 
import AdminPanelPage from './pages/AdminPanelPage';
import { ProductProvider } from './context/ProductContext';
// import Footer from './components/Footer';


function App() {

  return (
    <AuthProvider>
      <ProductProvider>
      <CartProvider>
      <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-account" element={<AccountPage/>} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />
          <Route path="/reset-password-request" element={<ResetPasswordRequestForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/ProductsPage" element={<ProductsPage type="products" />} />
          <Route path="/product-detail/:productId" element={<ProductDetailPage type="productsDetails" />} />
          <Route path="/cart" element={<Cart type="cart" />} />       
          <Route path="/contact-form" element={<ContactDetailsForm />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment" element={<CheckoutForm />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/adminPanel" element={<AdminPanelPage/>} />
        </Routes>
        {/* <Footer/> */}
      </Router>
      </OrderProvider>
      </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
