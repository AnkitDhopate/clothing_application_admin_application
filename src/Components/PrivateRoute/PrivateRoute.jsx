import React from "react";
import { Component } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem("token");

        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
