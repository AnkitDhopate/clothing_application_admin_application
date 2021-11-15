import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Category from "./Pages/Category/Category";
import "./App.css";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./Redux/Actions/auth";
import { getAllCategories } from "./Redux/Actions/category";
import { getAllProducts } from "./Redux/Actions/product";
import SubCategory from "./Pages/SubCategory/SubCategory";
import Product from "./Pages/Product/Product";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="app">
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/categories" component={Category} />
        <PrivateRoute path="/subcategories" component={SubCategory} />
        <PrivateRoute path="/products" component={Product} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
