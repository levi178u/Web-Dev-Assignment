import React from 'react';
import { Typography, Link } from '@mui/material';
import { BsInstagram, BsMeta, BsX } from 'react-icons/bs';

const Footer = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#2C3E50',
        color: 'white',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '4px solid #1ABC9C',
        marginTop: '60px', // ensures it sits after content
      }}
    >
      {/* Top Section */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '15px',
          maxWidth: '1200px',
        }}
      >
        <div style={{ maxWidth: '60%' }}>
          <Typography variant="h6" sx={{ fontWeight: '500', fontSize: '18px' }}>
            Lost & Found Portal
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              opacity: 0.8,
              marginTop: '5px',
              lineHeight: '20px',
            }}
          >
            Helping you reconnect with what you’ve lost — one item at a time.
            Post lost or found items easily and get in touch with the community.
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ color: 'white' }}>
            <BsInstagram size={28} />
          </a>
          <a href="https://www.meta.com/" target="_blank" rel="noreferrer" style={{ color: 'white' }}>
            <BsMeta size={28} />
          </a>
          <a href="https://www.x.com/" target="_blank" rel="noreferrer" style={{ color: 'white' }}>
            <BsX size={28} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          margin: '10px 0',
        }}
      ></div>

      {/* Bottom Section */}
      <div style={{ width: '100%', textAlign: 'center', fontSize: '14px', opacity: 0.85 }}>
        <Typography variant="body2">
          Made with ❤️ by <strong>CSE S2 Team</strong> | © {new Date().getFullYear()} Lost & Found Portal
        </Typography>
        <Link
          href="https://github.com/levi178u/Web-Dev-Assignment"
          target="_blank"
          sx={{
            color: 'white',
            fontSize: '12px',
            opacity: '0.6',
            marginTop: '6px',
            display: 'inline-block',
            '&:hover': { opacity: 1 },
          }}
        >
          View Project on GitHub
        </Link>
      </div>
    </div>
  );
};

export default Footer;
