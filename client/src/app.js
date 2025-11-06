import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Signup from "./components/Signup";
import Login from "./components/Login";
import LostItems from "./components/LostItem";
import FoundItems from "./components/FoundItems";
import Home from "./components/Home";
import ItemPage from "./components/ItemPage";
import LostItem from "./components/Lost_item";
import MyListings from "./components/MyListings";
import Layout from "./layout";
window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/lostitems" element={<LostItems />} />
          <Route path="/founditems" element={<FoundItems />} />
          <Route path="/postitem" element={<LostItem />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/:item" element={<ItemPage />} />
          <Route path="/*" element={<Home />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </BrowserRouter>

  );
}

export default App;
