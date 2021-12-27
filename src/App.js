import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import HeaderBanner from "./components/HeaderBanner/HeaderBanner";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import AddProduct from "./components/AddProduct/AddProduct";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {

  return (
    <>
      <Router>
          <Switch>
              <PrivateRoute path="/home">
                  <Navbar />
                  <HeaderBanner />
                  <AddProduct />
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
          </Switch>
      </Router>
    </>
  );
}

export default App;
