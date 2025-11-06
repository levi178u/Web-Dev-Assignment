import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Typography,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Avatar,
  LinearProgress,
} from "@mui/material";
import { Field, Formik, Form } from "formik";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import * as Yup from "yup";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "../styles/Lost_item.css";

const LostItem = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const usertoken = window.localStorage.getItem("token");
  const config = { headers: { token: usertoken } };

  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return user ? user._id : null;
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Item name is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Item type is required"),
    location: Yup.string().required("Location is required"),
    date: Yup.string().required("Date is required"),
    number: Yup.string().required("Phone number is required"),
  });

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map((err) => err.message);
      toast.error(errorMessages.join("\n"));
      return;
    }

    if (!image || image.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    const promises = [];

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      const storageRef = ref(storage, `/images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      const promise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploaded = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
          },
          reject,
          async () => {
            const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(imgUrl);
          }
        );
      });

      promises.push(promise);
    }

    Promise.all(promises)
      .then((urls) => {
        const newItem = { ...values, userId: getUserId(), img: urls };
        axios
          .post("http://localhost:4000/Items/newItem", newItem, config)
          .then(() => {
            toast.success("🎉 Item listed successfully!");
            setLoading(false);
            window.location.href = "/mylistings";
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Image upload failed.");
        setLoading(false);
      });
  };

  return (
    <div className="lost-container">
      <div className="lost-header">
        <Typography variant="h5" color="white">
          Lost something or found someone’s item? Post it here 🔍
        </Typography>
      </div>

      <div className="lost-content">
        <motion.div
          className="lost-form-container"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <Formik
            initialValues={{
              name: "",
              description: "",
              type: "",
              location: "",
              date: "",
              number: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form className="lost-form">
                {/* === Centered Upload Section === */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "25px",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Upload Item Image
                  </Typography>

                  <Avatar
                    src={preview}
                    alt="Preview"
                    sx={{
                      width: "7rem",
                      height: "7rem",
                      mb: 1.5,
                      border: "2px solid #1976d2",
                    }}
                  />

                  <Button
                    variant="contained"
                    component="label"
                    endIcon={<PhotoCamera />}
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                  >
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleImageUpload}
                    />
                  </Button>

                  {progress > 0 && progress < 100 && (
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        width: "60%",
                        marginTop: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </div>

                {/* === Form Fields === */}
                <TextField
                  label="Item Name"
                  name="name"
                  variant="standard"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                />

                <TextField
                  label="Description"
                  name="description"
                  multiline
                  variant="standard"
                  fullWidth
                  value={values.description}
                  onChange={handleChange}
                />

                <TextField
                  label="Location"
                  name="location"
                  variant="standard"
                  fullWidth
                  value={values.location}
                  onChange={handleChange}
                />

                <TextField
                  label="Date"
                  name="date"
                  variant="standard"
                  fullWidth
                  value={values.date}
                  onChange={handleChange}
                />

                <TextField
                  label="Contact Number"
                  name="number"
                  variant="standard"
                  fullWidth
                  value={values.number}
                  onChange={handleChange}
                />

                <FormControl variant="standard" fullWidth>
                  <InputLabel>Item Type</InputLabel>
                  <Select
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="Lost">Lost It</MenuItem>
                    <MenuItem value="Found">Found It</MenuItem>
                  </Select>
                  <FormHelperText>Select the type</FormHelperText>
                </FormControl>

                <motion.div whileTap={{ scale: 0.97 }} style={{ marginTop: 25 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{
                      height: "42px",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    {loading ? "Posting..." : "Create Post"}
                  </Button>
                </motion.div>
              </Form>
            )}
          </Formik>
        </motion.div>

        <motion.div
          className="lost-illustration"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="https://i.ibb.co/Q65DB0d/list-item.png"
            alt="Lost and Found Illustration"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LostItem;
