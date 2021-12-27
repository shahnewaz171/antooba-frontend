import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from './components/Home/Navbar/Navbar';
import HeaderBanner from "./components/Home/HeaderBanner/HeaderBanner";
import Products from "./components/Home/Products/Products";
import Login from "./components/Login/Login";
import Footer from "./components/Home/Footer/Footer";
import AddProduct from "./components/Dashboard/AddProduct/AddProduct";
import './App.css';

function App() {

  return (
    <>
      <Router>
          <Switch>
              <PrivateRoute path="/home">
                  <Navbar />
                  <HeaderBanner />
                  <Products />
                  <Footer />
              </PrivateRoute>
              <Route exact path="/">
                <Navbar />
                <Login />
              </Route>
              <Route exact path="/signup">
                <Navbar />
                  <Login />
              </Route>
              <PrivateRoute path="/admin">
                <AddProduct />
              </PrivateRoute>
              <PrivateRoute path="/addProduct">
                <AddProduct />
              </PrivateRoute>
          </Switch>
      </Router>
    </>
  );
}

export default App;
