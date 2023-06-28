import ReactDOM from 'react-dom/client';
import React, { useEffect, useReducer, useContext, useState, createContext } from 'react';
import axios from 'axios';
import Loading from './components/shared/Loading';
import MessageBox from './components/shared/MessageBox';
import Title from './components/shared/Title';
import Products from './components/homePage/Products';
import { GET_SUCCESS, GET_FAIL, GET_REQUEST, ADD_TO_CART, USER_SIGNIN, REMOVE_FROM_CART, CLEAR_CART, USER_SIGNOUT, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from './Actions';
import { useParams, useNavigate, useLocation, Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getError, addToCartHandler } from './Utils';
import ProductDescription from './components/productPage/ProductDescription';
import CartDescription from './components/productPage/CartDescription';
import { Store } from './Store';
import SignInForm from './components/signInPage/SignInForm';
import Checkout from './components/cartPage/Checkout';
import ItemsInCart from './components/cartPage/ItemsInCart';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import NavBar from 'react-bootstrap/Navbar'
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Rating from './components/shared/Rating';
import Product from './components/homePage/Product';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from "react-helmet-async";
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import SubmitOrderPage from './pages/SubmitOrderPage';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';
import { homePageReducer } from './reducers/homePageReducer';
import { storeReducer } from './reducers/storeReducer';
import { productPageReducer } from './reducers/productPageReducer';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSteps from './components/CheckoutSteps'



export {
    useEffect, useReducer, axios, Loading, MessageBox, Title, Products, GET_SUCCESS, GET_FAIL, GET_REQUEST,
    useContext, ADD_TO_CART, useParams, useNavigate, Row, Col, getError, ProductDescription, CartDescription, Store,
    useState, USER_SIGNIN, useLocation, Container, Checkout, SignInForm, ItemsInCart, REMOVE_FROM_CART, CLEAR_CART, Card, Button,
    ListGroup, Link, Rating, Product, Badge, LinkContainer, NavBar, Spinner, Alert, Helmet, Form, Route, Routes,
    BrowserRouter, HomePage, ProductPage, CartPage, SigninPage, SignupPage, Footer, Header, React, ReactDOM, App, reportWebVitals,
    HelmetProvider, StoreProvider, createContext, addToCartHandler, homePageReducer, storeReducer, productPageReducer, 
    NavDropdown, USER_SIGNOUT, ToastContainer, CheckoutSteps, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD, PaymentPage, SubmitOrderPage
};