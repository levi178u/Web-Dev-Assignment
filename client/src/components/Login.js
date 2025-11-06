import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import "../styles//Login.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const login = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4000/users/login", {
        email: values.email,
        password: values.password,
      });

      if (data.user) {
        toast.success("Logged In Successfully!", { position: "bottom-right" });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        setInfo(data);
        toast.error("Email or Password incorrect!", { position: "bottom-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops 🙁! Something went wrong.", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-text">
          <Typography variant="h3" fontWeight="bold" color="white">
            Welcome Back!
          </Typography>
          <Typography color="rgba(255,255,255,0.9)">
            Log in to continue finding and posting lost items.
          </Typography>
        </div>
      </div>

      <div className="login-container">
        <div className="login-image">
          <img
            src="https://i.ibb.co/G2k63ys/login-1.png"
            alt="Login illustration"
          />
        </div>

        <div className="login-form-wrapper">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => login(values)}
          >
            {({ values, handleChange }) => (
              <Form className="login-form">
                <Typography variant="h5" fontWeight="600" mb={1}>
                  Log In
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Please enter your credentials below
                </Typography>

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="email@example.com"
                  type="email"
                  size="small"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  required
                />

                <div className="login-btn-row">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      height: "40px",
                      textTransform: "none",
                      fontSize: "16px",
                      borderRadius: "8px",
                    }}
                  >
                    {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
                  </Button>
                </div>

                <Divider sx={{ my: 2 }} />
                <div className="signup-link">
                  <Typography variant="body2">
                    Don’t have an account?
                  </Typography>
                  <Link to="/sign-up" className="signup-link-text">
                    Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
