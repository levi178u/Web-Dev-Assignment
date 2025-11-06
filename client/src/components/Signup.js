import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import {
  Typography,
  Button,
  TextField,
  Avatar,
  LinearProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "../styles/Signup.css";

function Signup() {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = (values) => {
    const { nickname, fullname, email, password } = values;

    const uploadAndCreate = async () => {
      try {
        let imgUrl = null;

        if (image) {
          const storageRef = ref(storage, `/images/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const uploaded = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(uploaded);
            },
            (error) => console.error(error),
            async () => {
              imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
              await createUser({ nickname, fullname, email, password, img: imgUrl });
            }
          );
        } else {
          await createUser({ nickname, fullname, email, password });
        }
      } catch (error) {
        toast.error("Upload failed. Try again.");
      }
    };

    const createUser = async (payload) => {
      try {
        const response = await axios.post("http://localhost:4000/users/create", payload);
        if (response.data === "Done") {
          toast.success("Account created successfully!", { position: "bottom-right" });
          window.location.href = "/log-in";
        } else {
          toast.error("Something went wrong!", { position: "bottom-right" });
        }
      } catch (err) {
        toast.error("Server error!", { position: "bottom-right" });
      }
    };

    uploadAndCreate();
  };

  return (
    <div className="signup-page">
      {/* Top Hero Banner */}
      <div className="signup-hero">
        <Typography variant="h3" fontWeight="bold" color="white">
          Welcome On Board!
        </Typography>
        <Typography color="rgba(255,255,255,0.9)">
          Create your account to start posting and finding lost items.
        </Typography>
      </div>

      {/* Main Signup Container */}
      <div className="signup-container">
        <div className="signup-image">
          <img
            src="https://i.ibb.co/G2k63ys/login-1.png"
            alt="signup illustration"
          />
        </div>

        <div className="signup-form-wrapper">
          <Formik
            initialValues={{
              nickname: "",
              fullname: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form className="signup-form">
                <Typography variant="h5" fontWeight="600">
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Fill in your details below
                </Typography>

                {/* Profile Image */}
                <div className="avatar-section">
                  <Avatar
                    src={image && URL.createObjectURL(image)}
                    sx={{ width: "6rem", height: "6rem" }}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    endIcon={<PhotoCamera />}
                    sx={{ mt: 1 }}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {progress > 0 && progress < 100 && (
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{ width: "100%", mt: 1 }}
                    />
                  )}
                </div>

                {/* Form Fields */}
                <TextField
                  fullWidth
                  name="nickname"
                  label="Nickname"
                  size="small"
                  margin="normal"
                  value={values.nickname}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  name="fullname"
                  label="Full Name"
                  size="small"
                  margin="normal"
                  value={values.fullname}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  size="small"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  required
                />

                {/* Submit Button */}
                <div className="signup-btn-row">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{
                      height: "42px",
                      textTransform: "none",
                      fontSize: "16px",
                      borderRadius: "8px",
                    }}
                  >
                    Sign Up
                  </Button>
                </div>

                {/* Link to Login */}
                <div className="login-link">
                  <Typography variant="body2">
                    Already have an account?
                  </Typography>
                  <Link to="/log-in" className="login-link-text">
                    Log In
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

export default Signup;
