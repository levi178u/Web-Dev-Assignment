# 🧩 Lost & Found Web Application

A **MERN stack web application** designed to help users **report, find, and recover lost or found items** within a **specific campus**.  
This platform creates a centralized place where students and staff can reconnect with their belongings securely and efficiently.

---

## 🚀 Features

✅ **User Authentication** — Secure sign-up and login using JWT tokens.  
✅ **Post Lost & Found Items** — Users can upload item details and images.  
✅ **Browse Items** — Easily search and explore all reported items.  
✅ **My Listings** — View and manage items posted by the logged-in user.  
✅ **Pagination Support** — Smooth browsing experience across multiple pages.  
✅ **Campus-Specific Platform** — Only valid for users and activities **within the campus** (not a public/global platform).  
✅ **Responsive UI** — Built with Material UI and Framer Motion for a clean and modern look.  
✅ **Logout & Session Handling** — Automatic session management with secure logout.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React.js, Material UI (MUI), Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Other Tools** | Axios, Nodemon, JWT Authentication |

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/levi178u/Web-Dev-Assignment
   cd Web-Dev-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Create `.env` file** in the root directory  
   Add the following environment variables:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:4000`.

5. **Start the frontend**
   ```bash
   cd client
   npm start
   ```

   The frontend will start at `http://localhost:3000`.

---

## 🧠 Folder Structure

```
lost-and-found-campus/
│
├── server/
│   ├── app.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middlewares/
│   └── .env
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── img/
│   │   ├── styles/
│   │   ├── app.js
│   │   └── index.js
│   │   └── index.css
│   │   └── constraints.js
│   │   └── firebase.js
│   │   └── layout.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
```

---

## 💡 Key Points

- This application is **restricted to a specific campus** — only registered campus users can post or view items.  
- The system ensures **data privacy** and **safe item exchange** between legitimate users.  
- Admin moderation can be added to verify posts and avoid spam.

---

## 📸 UI Highlights

- Modern **navbar** and **footer** with glassmorphism design.  
- Smooth **animations** using Framer Motion.  
- Intuitive **item cards** for quick browsing.  
- Fully **responsive** on mobile and desktop devices.

---

## 🧾 License

This project is open-source and available under the **MIT License**.  
You are free to modify and adapt it for your own campus or institution.
