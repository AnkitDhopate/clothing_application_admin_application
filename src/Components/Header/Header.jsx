import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/auth";
import "./Header.css";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [auth.authenticate]);

  const logoutAdmin = () => {
    dispatch(logout());
  };

  const renderLoggedIn = () => {
    return (
      <>
        <NavLink className="nav_link" to="/">
          Home
        </NavLink>
        <NavLink className="nav_link" to="/categories">
          Categories
        </NavLink>
        <NavLink className="nav_link" to="/subcategories">
          Sub-Categories
        </NavLink>
        <NavLink className="nav_link" to="/products">
          Products
        </NavLink>
        <ul onClick={logoutAdmin}>Logout</ul>
      </>
    );
  };

  const renderNonLoggedIn = () => {
    return (
      <>
        <NavLink className="nav_link" to="/login">
          Login
        </NavLink>
      </>
    );
  };

  return (
    <>
      <div className="header_container">
        <div className="logo">
          <h1>My Clothing</h1>
        </div>
        <div className="links">
          {auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()}
        </div>
      </div>
      {props.children}
    </>
  );
};

export default Header;
