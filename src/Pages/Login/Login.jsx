import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import { TextField, Button } from "@material-ui/core";
import { adminLogin } from "../../Redux/Actions/auth";
import "./Login.css";
import { Redirect } from "react-router";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(adminLogin(user));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header>
        <div className="login_container">
          <form onSubmit={userLogin}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ marginTop: "10px", width: "600px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              variant="outlined"
              style={{ marginTop: "20px", width: "600px" }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              className="submit-btn"
              variant="contained"
              size="medium"
              color="primary"
              style={{ marginTop: "30px", width: "150px" }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </Header>
    </>
  );
};

export default Login;
