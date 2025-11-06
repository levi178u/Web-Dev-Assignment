import React from "react";
import { Stack } from "@mui/material";
import Navbar from "./components/Navbar.js";
import Footer from "./components/footer.js";

function Layout(props) {
  return (
    <Stack
      spacing="0"
      width="100%"
      alignItems="center"
      sx={{
        minHeight: "100vh",        // ✅ Let it grow beyond 1 screen
        justifyContent: "flex-start", // ✅ Stack content naturally
      }}
    >
      <Navbar />
      <div style={{ width: "100%" }}>
        {props.children}
      </div>
      <Footer />
    </Stack>
  );
}

export default Layout;
