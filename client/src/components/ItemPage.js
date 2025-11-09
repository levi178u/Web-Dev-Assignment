import React, { useState, useEffect } from "react";
import { LOGGED_IN, setConstraint } from "../constraints";
import DeleteIcon from '@mui/icons-material/Delete';
import ContactsIcon from '@mui/icons-material/Contacts';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from "axios";
import {
  Modal,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import { Carousel } from 'react-carousel-minimal';
import { MdDateRange } from 'react-icons/md';
import { GrMap } from 'react-icons/gr';

function ItemPage() {
  const [item, setItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [slides, setSlides] = useState([]);

  setConstraint(true);
  const queryParams = new URLSearchParams(window.location.search);
  const item_id = queryParams.get('cid');
  const current_user = queryParams.get('type').split("/")[1];

  useEffect(() => {
    axios.get(http://localhost:4000/items/${item_id})
      .then((response) => {
        const data = response.data.item;
        const slides = data.img.map((item) => ({ image: item }));
        setSlides(slides);
        setItem(data);
      })
      .catch((err) => console.log("Error :", err));
  }, []);

  const delete_item = () => {
    axios.delete(http://localhost:4000/items/delete/${item_id})
      .then(() => {
        handleCloseDelete();
        toast.success('Item deleted successfully 🗑', { position: "bottom-right", autoClose: 1000 });
        window.location.href = "/mylistings";
      })
      .catch((err) => console.log("Error" + err));
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  if (!item) return <Typography align="center" mt={10}>Loading...</Typography>;

  return (
    <div className="item-page-container" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10px" }}>
      
      {/* Header */}
      <div style={{
        width: "100%",
        backgroundColor: "#357ABD",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "130px",
        marginBottom: "20px",
      }}>
        <Typography fontSize="26px" fontWeight="bold">{${item.type} Item}</Typography>
        <Typography fontSize="22px">{Someone Found ${item.name}}</Typography>
      </div>

      {/* Main Content */}
      <div style={{
        width: "95%",
        maxWidth: "1200px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px"
      }}>
        
        {/* Image Carousel */}
        <div style={{
          flex: "1 1 55%",
          borderRadius: "10px",
          overflow: "hidden",
          background: "#f5f5f5",
          padding: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}>
          <Carousel
            data={slides}
            width="100%"
            height="300px"
            radius="10px"
            automatic={false}
            slideBackgroundColor="#f0f0f0"
            slideImageFit="contain"
            dots={true}
            thumbnails={false}
          />
        </div>

        {/* User & Buttons */}
        <div style={{
          flex: "1 1 35%",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          padding: "20px",
          textAlign: "center"
        }}>
          <Avatar src={item?.userId?.img} sx={{ width: 110, height: 110, margin: "0 auto 10px" }} />
          <Typography fontSize="22px" fontWeight="bold" color="primary">{item?.userId?.fullname}</Typography>

          {current_user === "true" ? (
            <Button
              startIcon={<DeleteIcon />}
              fullWidth
              sx={{ mt: 3, textTransform: "none", borderRadius: "8px" }}
              variant="contained"
              color="error"
              onClick={handleShowDelete}
            >
              Delete Post
            </Button>
          ) : (
            <Button
              startIcon={<ContactsIcon />}
              fullWidth
              sx={{ mt: 3, textTransform: "none", borderRadius: "8px" }}
              variant="contained"
              color="primary"
              onClick={handleShowContact}
            >
              Contact Finder
            </Button>
          )}
        </div>
      </div>

      {/* Description Section */}
      <div style={{ width: "90%", maxWidth: "1000px", marginTop: "40px", lineHeight: "1.8" }}>
        <Typography fontSize="20px" fontWeight="bold">Description</Typography>
        <Typography fontSize="16px" style={{ textAlign: "justify", marginTop: "10px" }}>
          {item.description}
        </Typography>
      </div>

      {/* Item Info Section */}
      <div style={{
        width: "90%",
        maxWidth: "1000px",
        marginTop: "40px",
        padding: "20px",
        background: "#eff5ff",
        borderRadius: "10px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MdDateRange fontSize="20px" />
            <Typography fontWeight="bold">Date Found:</Typography>
          </div>
          <Typography>{item.date}</Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <GrMap fontSize="20px" />
            <Typography fontWeight="bold">Location Found:</Typography>
          </div>
          <Typography>{item.location}</Typography>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal open={showDelete} onClose={handleCloseDelete}>
        <div style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          width: "400px",
          padding: "30px",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}>
          <Typography fontSize="18px" fontWeight="bold" mb={3}>Are you sure you want to delete this post?</Typography>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained" color="error" onClick={delete_item}>Yes</Button>
            <Button variant="outlined" onClick={handleCloseDelete}>No</Button>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal open={showContact} onClose={handleCloseContact}>
        <div style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          width: "400px",
          padding: "30px",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}>
          <Typography fontSize="18px" fontWeight="bold" mb={2}>
            {item?.userId?.fullname}'s Contact:
          </Typography>
          <Typography fontSize="16px">{item?.number}</Typography>
        </div>
      </Modal>

    </div>
  );
}

export default ItemPage;