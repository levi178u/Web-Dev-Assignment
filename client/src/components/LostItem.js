import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcAbout, FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { setConstraint } from "../constraints";
import { Button, Typography, Pagination, Avatar } from "@mui/material";
import Axios from "axios";
import "../styles/LostItem.css";

const Paginationn = ({ page, setPage, max }) => {
  const handleChange = (_, value) => setPage(value);

  return (
    <Pagination
      sx={{ pt: "50px" }}
      count={Math.ceil(max)}
      page={page}
      onChange={handleChange}
      color="primary"
      showLastButton
      showFirstButton
    />
  );
};

export default function LostItems() {
  const [user_info, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  setConstraint(true);

  useEffect(() => {
    Axios.get("http://localhost:4000/items")
      .then((response) => {
        const allItems = response.data.items.reverse();
        const itemsPerPage = 9;
        const numItems = allItems.length;
        setMaxPages(Math.ceil(numItems / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = allItems.slice(startIndex, endIndex);

        const lostItems = data.filter((item) => item.type === "Lost");
        setItems(lostItems);
      })
      .catch((err) => console.error("Error:", err));
  }, [page]);

  return (
    <div className="lost-page">
      {/* Header */}
      <div className="lost-header">
        <Typography variant="h5" color="white" sx={{ fontWeight: 500 }}>
          Welcome {user_info?.nickname} 👋
        </Typography>
        <Typography variant="h6" color="white" sx={{ fontWeight: "bold" }}>
          Here you can find all Lost Items 🧳
        </Typography>
      </div>

      {/* Grid Container */}
      <div className="lost-grid">
        {items.length > 0 ? (
          items.map((item) => {
            const date = new Date(item.createdAt);
            const createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

            const isUser = item.userId === user_info._id;

            return (
              <motion.div
                key={item._id}
                className="lost-card"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              >
                <div className="lost-card-img">
                  <Avatar
                    src={item.img}
                    alt={item.name}
                    sx={{ width: 180, height: 180 }}
                  />
                </div>

                <div className="lost-card-content">
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>

                  <div className="lost-info">
                    <FcAbout size={22} />
                    <Typography variant="body2">
                      {item.description.toString().slice(0, 40)}...
                    </Typography>
                  </div>

                  <div className="lost-info">
                    <FcOvertime size={22} />
                    <Typography variant="body2">{createdAt}</Typography>
                  </div>

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      to={`/${item.name}?cid=${item._id}&type=${item.type}/${isUser}`}
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        mt: 1,
                      }}
                    >
                      More Details
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <Typography color="gray" variant="body1">
            No lost items found 😔
          </Typography>
        )}
      </div>

      {/* Pagination */}
      <div className="lost-pagination">
        <Paginationn page={page} setPage={setPage} max={maxPages} />
      </div>
    </div>
  );
}
