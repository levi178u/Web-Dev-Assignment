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
                                    "url(data:image/jpeg;base64,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)",
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
