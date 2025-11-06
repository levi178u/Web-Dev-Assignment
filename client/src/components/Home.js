import React from "react";
import { Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import Footer from "./footer";

const Home = () => {
    const isLoggedIn = JSON.parse(window.localStorage.getItem("user"));

    const navigateTo = (path) => {
        if (isLoggedIn) {
            window.location.href = path;
        } else {
            window.location.href = "/log-in";
        }
    };

    return (
        <>
            <div
                style={{
                    width: "100%",
                    paddingTop: "80px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "100px",
                    overflowX: "hidden",
                }}
            >
                {/* ============ HERO SECTION ============ */}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "40px",
                        padding: "40px 20px",
                        background:
                            "linear-gradient(180deg, #E8F3FF 0%, #F9FBFF 100%)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            textAlign: "left",
                            gap: "20px",
                            maxWidth: "600px",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: "700",
                                fontSize: { xs: "2.5rem", md: "3.5rem" },
                                color: "#1D4E89",
                            }}
                        >
                            Reunite People with What Matters ❤️
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "#2F3E46",
                                fontSize: "1.1rem",
                                opacity: 0.9,
                                lineHeight: "1.8rem",
                            }}
                        >
                            Lost something precious? Found something that’s not yours?
                            <br /> Our platform connects honest finders with those searching for their belongings.
                            Join the community that believes in doing good.
                        </Typography>

                        <motion.div whileTap={{ scale: 0.96 }}>
                            <Button
                                onClick={() => navigateTo("/postitem")}
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: "10px",
                                    padding: "10px 25px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    backgroundColor: "#1D4E89",
                                    "&:hover": { backgroundColor: "#163E6B" },
                                }}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    </div>

                    <motion.img
                        src="https://i.ibb.co/9Z8qTQj/bg2.png"
                        alt="Lost and Found illustration"
                        style={{
                            width: "90%",
                            maxWidth: "500px",
                            objectFit: "contain",
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    />
                </div>

                {/* ============ ABOUT SECTION ============ */}
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#1D4E89",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "60px 20px",
                        color: "#fff",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1200px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "40px",
                        }}
                    >
                        <div style={{ flex: 1, minWidth: "300px" }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "700",
                                    color: "#F8F9FA",
                                    marginBottom: "20px",
                                }}
                            >
                                About Lost & Found Portal
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#E0E7EF",
                                    fontSize: "1rem",
                                    lineHeight: "1.8rem",
                                }}
                            >
                                We’re more than just a website — we’re a helping hand in moments of panic and relief.
                                Whether it’s a wallet, a pet, or a phone, our mission is simple:
                                connect lost items with their rightful owners.
                                <br />
                                <br />
                                Every post here has a story — and together, we help write happy endings.
                            </Typography>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    marginTop: "30px",
                                    flexWrap: "wrap",
                                    gap: "15px",
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        onClick={() => navigateTo("/lostitems")}
                                        sx={{
                                            color: "#fff",
                                            border: "2px solid #fff",
                                            borderRadius: "8px",
                                            padding: "8px 20px",
                                            textTransform: "none",
                                            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                                        }}
                                    >
                                        View Lost Items
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        onClick={() => navigateTo("/founditems")}
                                        sx={{
                                            color: "#fff",
                                            border: "2px solid #fff",
                                            borderRadius: "8px",
                                            padding: "8px 20px",
                                            textTransform: "none",
                                            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                                        }}
                                    >
                                        View Found Items
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        onClick={() => navigateTo("/postitem")}
                                        sx={{
                                            color: "#1D4E89",
                                            backgroundColor: "#fff",
                                            borderRadius: "8px",
                                            padding: "8px 20px",
                                            textTransform: "none",
                                            fontWeight: "600",
                                            "&:hover": { backgroundColor: "#F0F0F0" },
                                        }}
                                    >
                                        Post an Item
                                    </Button>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            style={{
                                flex: 1,
                                minWidth: "300px",
                                height: "400px",
                                borderRadius: "20px",
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1533055640609-24b498dfd77c?auto=format&fit=crop&w=900&q=60)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                            }}
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>

                {/* ============ CALL TO ACTION SECTION ============ */}
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        padding: "80px 20px",
                        background:
                            "linear-gradient(90deg, #F0F9FF 0%, #E6F0FA 100%)",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "700", color: "#1D4E89", marginBottom: "20px" }}
                    >
                        Together, Let’s Bring Lost Things Home 🏠
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            maxWidth: "600px",
                            margin: "0 auto 30px auto",
                            color: "#555",
                            lineHeight: "1.6rem",
                        }}
                    >
                        Every day, hundreds of lost items go unclaimed.
                        Be the reason someone smiles today — report or find items with ease.
                    </Typography>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigateTo("/postitem")}
                            sx={{
                                backgroundColor: "#1D4E89",
                                borderRadius: "10px",
                                padding: "10px 25px",
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#163E6B" },
                            }}
                        >
                            Start Posting Now
                        </Button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Home;
