import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { BsFillCaretDownFill, BsBoxSeam, BsSearch } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { setConstraint } from '../constraints';

const Navbar = () => {
  const token = window.localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const signout = () => {
    setConstraint(false);
    localStorage.clear();
    window.location.href = '/log-in';
  };

  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 20px 20px',
        padding: '15px 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left: Logo + Title */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#1a1a1a',
          gap: '12px',
        }}
      >
        <img
          src="https://i.ibb.co/G2851XX/Main-Logo-1.png"
          alt="Lost & Found Logo"
          style={{
            width: '55px',
            height: '55px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        />
        <div>
          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '700',
              fontSize: '22px',
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '0.6px',
            }}
          >
            Lost & Found
          </h2>
          <p
            style={{
              fontSize: '13px',
              margin: 0,
              color: '#555',
              fontWeight: '400',
              letterSpacing: '0.4px',
            }}
          >
            Find it • Return it • Reconnect
          </p>
        </div>
      </Link>

      {/* Center: Navigation Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {token && (
          <>
            {/* Dropdown */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<BsFillCaretDownFill size="15px" />}
                disableRipple
                sx={{
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  color: '#333',
                  fontSize: '16px',
                  '&:hover': { color: '#007BFF', background: 'transparent' },
                }}
              >
                Browse
              </Button>
            </motion.div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem component={Link} to="/LostItems" onClick={handleClose}>
                Lost Items
              </MenuItem>
              <MenuItem component={Link} to="/FoundItems" onClick={handleClose}>
                Found Items
              </MenuItem>
            </Menu>

            {/* Links */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/mylistings"
                style={{
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  color: '#333',
                  transition: 'color 0.3s',
                }}
              >
                My Listings
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/postitem"
                style={{
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  color: '#333',
                  transition: 'color 0.3s',
                }}
              >
                Post Item
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
        {token ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              onClick={signout}
              startIcon={<BsBoxSeam />}
              sx={{
                textTransform: 'none',
                background: 'linear-gradient(135deg, #007BFF, #0056b3)',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                borderRadius: '10px',
                padding: '7px 20px',
                fontWeight: 600,
                fontSize: '15px',
                boxShadow: '0 3px 10px rgba(0, 123, 255, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0056b3, #0041a8)',
                },
              }}
            >
              Logout
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outlined"
                component={Link}
                to="/log-in"
                startIcon={<BsSearch />}
                sx={{
                  textTransform: 'none',
                  borderColor: '#007BFF',
                  color: '#007BFF',
                  borderRadius: '10px',
                  fontFamily: 'Poppins, sans-serif',
                  padding: '7px 20px',
                  fontWeight: 600,
                  fontSize: '15px',
                  '&:hover': {
                    backgroundColor: 'rgba(0,123,255,0.08)',
                    borderColor: '#007BFF',
                  },
                }}
              >
                Login
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                component={Link}
                to="/sign-up"
                sx={{
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #007BFF, #0056b3)',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '7px 20px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  boxShadow: '0 3px 10px rgba(0, 123, 255, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0056b3, #0041a8)',
                  },
                }}
              >
                Sign Up
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
