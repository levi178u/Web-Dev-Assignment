import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import { motion } from "framer-motion";
import { FcAbout, FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Button, Typography, Pagination, Avatar } from "@mui/material";
import Axios from "axios";
import "../styles/MyListings.css"; // ⬅️ new css file

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

export default function Feed() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return user ? user : null;
  };
  const user_info = getUserId();
  setConstraint(true);

  useEffect(() => {
    Axios.get("http://localhost:4000/items")
      .then((response) => {
        const allItems = response.data.items.reverse();
        const itemsPerPage = 9;
        setMaxPages(Math.ceil(allItems.length / itemsPerPage));

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentItems = allItems.slice(start, end);

        const myItems = currentItems.filter(
          (item) => item.userId === user_info._id
        );
        setItems(myItems);
      })
      .catch((err) => console.error("Error:", err));
  }, [page]);

  return (
    <div className="feed-page">
      {/* Header Section */}
      <div className="feed-header">
        <Typography variant="h5" color="white">
          Here are your posted items, {user_info?.nickname} 👋
        </Typography>
      </div>

      {/* Card Grid */}
      <div className="feed-grid">
        {items.length > 0 ? (
          items.map((item) => {
            const date = new Date(item.createdAt);
            const createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

            return (
              <motion.div
                className="feed-card"
                key={item._id}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              >
                <div className="feed-card-image">
                  <Avatar
                    src={item.img}
                    alt={item.name}
                    sx={{ width: 150, height: 150 }}
                  />
                </div>

                <div className="feed-card-content">
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>

                  <div className="feed-info">
                    <FcAbout size={22} />
                    <Typography variant="body2">
                      {item.description.slice(0, 40)}...
                    </Typography>
                  </div>

                  <div className="feed-info">
                    <FcOvertime size={22} />
                    <Typography variant="body2">{createdAt}</Typography>
                  </div>

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      component={Link}
                      to={`/${item.name}?cid=${item._id}&type=${item.type}/true`}
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
            No items found 😔
          </Typography>
        )}
      </div>

      {/* Pagination */}
      <div className="feed-pagination">
        <Paginationn page={page} setPage={setPage} max={maxPages} />
      </div>
    </div>
  );
}
