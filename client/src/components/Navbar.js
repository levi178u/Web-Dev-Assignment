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
        background: '#ffffff',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        borderRadius: '0 0 15px 15px',
        padding: '10px 40px',
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
          gap: '10px',
        }}
      >
        <img
          src="https://i.ibb.co/G2851XX/Main-Logo-1.png"
          alt="Lost & Found Logo"
          style={{ width: '50px', height: '50px', borderRadius: '10px' }}
        />
        <div>
          <h2
            style={{
              fontWeight: '700',
              fontSize: '20px',
              margin: 0,
              letterSpacing: '0.5px',
            }}
          >
            Lost & Found
          </h2>
          <p
            style={{
              fontSize: '12px',
              margin: 0,
              color: '#555',
              letterSpacing: '0.3px',
            }}
          >
            Find it. Return it. Reconnect.
          </p>
        </div>
      </Link>

      {/* Center: Navigation Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontWeight: 600,
              color: '#333',
              transition: 'color 0.3s',
            }}
          >
            Home
          </Link>
        </motion.div>

        {/* Items Browser Dropdown */}
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
              textTransform: 'none',
              color: '#333',
              '&:hover': { color: '#007BFF', background: 'transparent' },
            }}
          >
            Items Browser
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
          <MenuItem
            component={Link}
            to={token ? '/LostItems' : '/log-in'}
            onClick={handleClose}
          >
            Lost Items
          </MenuItem>
          <MenuItem
            component={Link}
            to={token ? '/FoundItems' : '/log-in'}
            onClick={handleClose}
          >
            Found Items
          </MenuItem>
        </Menu>

        {token && (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/mylistings"
                style={{
                  textDecoration: 'none',
                  fontWeight: 600,
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

      {/* Right: Buttons */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {token ? (
          <Button
            variant="contained"
            onClick={signout}
            startIcon={<BsBoxSeam />}
            sx={{
              textTransform: 'none',
              backgroundColor: '#007BFF',
              '&:hover': { backgroundColor: '#0056b3' },
              borderRadius: '8px',
              padding: '6px 18px',
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              component={Link}
              to="/log-in"
              startIcon={<BsSearch />}
              sx={{
                textTransform: 'none',
                borderColor: '#007BFF',
                color: '#007BFF',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0,123,255,0.1)',
                  borderColor: '#007BFF',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/sign-up"
              sx={{
                textTransform: 'none',
                backgroundColor: '#007BFF',
                '&:hover': { backgroundColor: '#0056b3' },
                borderRadius: '8px',
                padding: '6px 18px',
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
