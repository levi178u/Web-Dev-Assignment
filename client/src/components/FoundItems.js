import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcAbout, FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { setConstraint } from "../constraints";
import Axios from "axios";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../styles/FoundItems.css"; // ✅ custom styling

const Paginationn = ({ page, setPage, max }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="pagination-container">
      <Pagination
        count={Math.ceil(max)}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default function FoundItems() {
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [item, setitem] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  setConstraint(true);

  useEffect(() => {
    Axios({
      url: "http://localhost:4000/items",
      method: "GET",
    })
      .then((response) => {
        const allitems = response.data.items.reverse();
        const itemsPerPage = 9;
        const numItems = allitems.length;
        setMaxPages(Math.ceil(numItems / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = allitems.slice(startIndex, endIndex);

        const filteredItems = data
          .filter((it) => it.type === "Found")
          .map((item) => {
            const created_date = new Date(item.createdAt);
            const createdAt = `${created_date.getDate()}/${created_date.getMonth() + 1
              }/${created_date.getFullYear()} ${created_date.getHours()}:${created_date.getMinutes()}`;

            const user = item.userId === user_info._id;

            return (
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                key={item._id}
                className="card"
              >
                <div className="card-image">
                  <Avatar src={item.img} alt={item.name} className="avatar-img" />
                </div>

                <div className="card-body">
                  <h3 className="item-title">{item.name}</h3>

                  <div className="info-row">
                    <FcAbout className="icon" />
                    <Typography variant="body2" className="item-desc">
                      {item.description.slice(0, 40)}...
                    </Typography>
                  </div>

                  <div className="info-row">
                    <FcOvertime className="icon" />
                    <Typography variant="body2">{createdAt}</Typography>
                  </div>

                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      component={Link}
                      to={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      More Details
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          });

        setitem(filteredItems);
      })
      .catch((err) => console.log("Error:", err));
  }, [page]);

  return (
    <div className="found-container">
      <div className="header">
        <div className="header-text">
          <Typography variant="h6" color="white">
            Hola Amigo {user_info.nickname} 👋! Kaise ho, theek ho?
          </Typography>
          <Typography variant="h5" color="white" fontWeight="bold">
            Here you can find all Found Items
          </Typography>
        </div>
      </div>

      <div className="grid-container">{item}</div>

      <Paginationn page={page} setPage={setPage} max={maxPages} />
    </div>
  );
}
