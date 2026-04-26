<div align="center">

# 🚚 LoadWheel

### Truck Booking & Logistics Platform

**A full-stack MERN application for booking trucks, tracking shipments in real-time, and managing logistics operations — built with a startup-grade UI.**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.6-010101?style=flat-square&logo=socket.io)](https://socket.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [API Reference](#-api-reference)
- [User Roles](#-user-roles)
- [Pages & Screens](#-pages--screens)
- [Deployment](#-deployment)

---

## 🌐 Overview

LoadWheel is a modern logistics platform that connects customers who need to ship goods with verified truck drivers. Inspired by Uber Freight and Porter, it provides instant booking, live GPS tracking, AI-powered pricing, and a real-time driver-customer chat system.

---

## ✨ Features

### 👤 Customer Features
| Feature | Description |
|---|---|
| **Instant Booking** | Search available trucks by route and book in under 2 minutes |
| **Smart Truck Selection** | Choose from Mini, Medium, or Heavy trucks based on cargo size |
| **AI Price Estimation** | Transparent fare breakdown — base fare, toll, allowance, and GST |
| **Live GPS Tracking** | Watch your truck move in real-time on an interactive Google Map |
| **Driver Chat** | In-app messaging with your assigned driver via Socket.IO |
| **Booking History** | View all past and active shipments with status filters |
| **Route Preview** | See the full route on map before confirming a booking |

### 🚚 Driver Features
| Feature | Description |
|---|---|
| **Availability Toggle** | Go online/offline with a single tap |
| **Trip Management** | Accept bookings, start trips, and mark deliveries |
| **Live Location Broadcast** | Share GPS location in real-time using the browser Geolocation API |
| **Earnings Dashboard** | View per-trip earnings and total revenue |
| **Active Trip Map** | See the current route on a live map |

### 🛠️ Admin Features
| Feature | Description |
|---|---|
| **Analytics Dashboard** | Revenue, bookings, active trucks, and user stats with weekly bar chart |
| **Booking Management** | View and monitor all bookings across the platform |
| **User Management** | See all registered customers and drivers |
| **Fleet Overview** | Monitor all trucks, their type, capacity, and availability |
| **Pricing Control** | Configure base fare per km, driver allowance, toll cost, and GST |

### 🔐 Platform Features
| Feature | Description |
|---|---|
| **JWT Authentication** | Secure login with 7-day token expiry |
| **Role-Based Access** | Separate dashboards and routes for customer, driver, and admin |
| **Real-Time Updates** | Socket.IO powers live tracking and chat without page refresh |
| **Responsive Design** | Mobile-first layout that works on all screen sizes |
| **Skeleton Loaders** | Shimmer loading states for all data-fetching screens |
| **Protected Routes** | Unauthorized users are redirected automatically |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React.js | 18.2 | UI framework |
| Vite | 5.0 | Build tool & dev server |
| Tailwind CSS | 3.3 | Utility-first styling |
| React Router DOM | 6.20 | Client-side routing |
| Axios | 1.6 | HTTP client with JWT interceptor |
| Socket.IO Client | 4.6 | Real-time communication |
| Google Maps JS API | Latest | Maps, routing, distance matrix |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | 4.18 | REST API framework |
| MongoDB | 8.0 | NoSQL database |
| Mongoose | 8.0 | ODM for MongoDB |
| Socket.IO | 4.6 | WebSocket server |
| bcryptjs | 2.4 | Password hashing |
| JSON Web Token | 9.0 | Authentication tokens |
| dotenv | 16.3 | Environment variable management |
| Axios | 1.6 | Google Maps API calls |

---

## 📁 Project Structure

```
LoadWheel/
├── Frontend/                     # React + Vite client
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # Reusable UI components
│   │   │   │   ├── Button.jsx    # Button variants (primary, ghost, danger...)
│   │   │   │   ├── Input.jsx     # Input with icon & error support
│   │   │   │   ├── Badge.jsx     # Status badges with auto color mapping
│   │   │   │   ├── Skeleton.jsx  # Shimmer loading placeholders
│   │   │   │   ├── Modal.jsx     # Accessible modal with backdrop blur
│   │   │   │   └── StatCard.jsx  # Analytics stat card with trend
│   │   │   ├── Navbar.jsx        # Sticky navbar with avatar dropdown
│   │   │   ├── Sidebar.jsx       # Collapsible role-aware sidebar
│   │   │   ├── MapView.jsx       # Google Maps with route + driver marker
│   │   │   ├── TruckCard.jsx     # Truck selection card
│   │   │   ├── PriceBreakdown.jsx# Itemized fare display
│   │   │   └── ProtectedRoute.jsx# Role-based route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state (login/register/logout)
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Sign in page
│   │   │   ├── Register.jsx      # Sign up with role selection
│   │   │   ├── BookTruck.jsx     # Search, select & confirm booking
│   │   │   ├── MyBookings.jsx    # Customer booking history
│   │   │   ├── Tracking.jsx      # Live tracking + driver chat
│   │   │   ├── DriverPanel.jsx   # Driver dashboard
│   │   │   └── AdminDashboard.jsx# Admin analytics & management
│   │   ├── services/
│   │   │   └── api.js            # Axios instance with auth interceptor
│   │   ├── App.jsx               # Routes + sidebar layout
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Tailwind + custom design tokens
│   ├── .env                      # Frontend environment variables
│   ├── tailwind.config.js        # Design system configuration
│   ├── vite.config.js            # Vite + API proxy config
│   └── package.json
│
└── Backend/                      # Node.js + Express server
    ├── controllers/
    │   ├── authController.js     # Register & login logic
    │   ├── bookingController.js  # CRUD for bookings
    │   ├── truckController.js    # Truck availability & location
    │   ├── pricingController.js  # Fare calculation
    │   └── adminController.js   # Platform stats aggregation
    ├── middleware/
    │   └── auth.js               # JWT verify + role authorization
    ├── models/
    │   ├── User.js               # User schema (customer/driver/admin)
    │   ├── Truck.js              # Truck schema with location
    │   ├── Booking.js            # Booking schema with status
    │   └── Pricing.js            # Configurable pricing rules
    ├── routes/
    │   ├── auth.js               # POST /api/auth/register|login
    │   ├── users.js              # GET /api/users
    │   ├── trucks.js             # GET|PATCH /api/trucks
    │   ├── bookings.js           # GET|POST|PATCH /api/bookings
    │   ├── pricing.js            # GET|PUT|POST /api/pricing
    │   └── admin.js              # GET /api/admin/stats
    ├── services/
    │   ├── pricing.js            # Google Distance Matrix + fare formula
    │   └── socket.js             # Socket.IO rooms, tracking & chat
    ├── .env                      # Backend environment variables
    ├── server.js                 # Express + Socket.IO + MongoDB bootstrap
    └── package.json
```

---

## ✅ Prerequisites

Make sure you have the following installed before starting:

- **Node.js** v18 or higher — [Download](https://nodejs.org)
- **MongoDB** v6 or higher (local) — [Download](https://www.mongodb.com/try/download/community) OR use [MongoDB Atlas](https://cloud.mongodb.com) (free cloud)
- **Git** — [Download](https://git-scm.com)
- **Google Maps API Key** — [Get one free](https://console.cloud.google.com)

> **Required Google APIs to enable:**
> - Maps JavaScript API
> - Distance Matrix API
> - Directions API

---

## 🚀 Setup & Installation

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-username/loadwheel.git
cd loadwheel
```

### Step 2 — Setup the Backend

```bash
cd Backend
npm install
```

### Step 3 — Setup the Frontend

```bash
cd ../Frontend
npm install
```

---

## 🔑 Environment Variables

### Backend — `Backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/loadwheel
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_MAPS_KEY=your_google_maps_api_key_here
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server runs on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/loadwheel` |
| `JWT_SECRET` | Secret key for signing JWT tokens — keep this private | Any long random string |
| `GOOGLE_MAPS_KEY` | Google Maps API key for distance calculation | `AIzaSy...` |

> **Using MongoDB Atlas?** Replace `MONGO_URI` with your Atlas connection string:
> ```
> MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/loadwheel
> ```

### Frontend — `Frontend/.env`

```env
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key_here
```

| Variable | Description |
|---|---|
| `VITE_GOOGLE_MAPS_KEY` | Google Maps API key for the interactive map in the browser |

> The same Google Maps API key can be used for both frontend and backend.

---

## ▶️ Running the App

### Start MongoDB (if running locally)

**Windows:**
```bash
net start MongoDB
```

**macOS / Linux:**
```bash
mongod --dbpath /data/db
```

### Start the Backend

```bash
cd Backend
npm run dev
```

The API server starts at: `http://localhost:5000`

### Start the Frontend

Open a new terminal:

```bash
cd Frontend
npm run dev
```

The app opens at: `http://localhost:3000`

> The Vite dev server proxies all `/api` requests to `http://localhost:5000` automatically — no CORS issues.

### Both running? Open the app:

```
http://localhost:3000
```

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user (customer or driver) |
| `POST` | `/api/auth/login` | Public | Login and receive a JWT token |

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/users` | Admin | Get all registered users |
| `GET` | `/api/users/me` | Any | Get current logged-in user profile |

### Trucks

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/trucks/available` | Customer | Get all available trucks |
| `GET` | `/api/trucks` | Admin | Get all trucks in the fleet |
| `PATCH` | `/api/trucks/availability` | Driver | Toggle online/offline status |
| `PATCH` | `/api/trucks/location` | Driver | Update truck GPS coordinates |

### Bookings

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/bookings` | Customer | Create a new booking |
| `GET` | `/api/bookings/my` | Customer | Get current customer's bookings |
| `GET` | `/api/bookings/driver` | Driver | Get bookings assigned to this driver |
| `GET` | `/api/bookings` | Admin | Get all bookings on the platform |
| `GET` | `/api/bookings/:id` | Any | Get a single booking by ID |
| `PATCH` | `/api/bookings/:id/status` | Driver/Admin | Update booking status |

### Pricing

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/pricing` | Any | Get current pricing rules |
| `PUT` | `/api/pricing` | Admin | Update pricing configuration |
| `POST` | `/api/pricing/calculate` | Any | Calculate fare for a route |

### Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Admin | Get platform-wide analytics |

### Pricing Formula

```
Total = (distance × baseFarePerKm × truckMultiplier)
      + tollCost
      + driverAllowance
      + ((subtotal × taxPercentage) / 100)
```

| Truck Type | Multiplier |
|---|---|
| Mini | 1.0× |
| Medium | 1.2× |
| Heavy | 1.5× |

---

## 👥 User Roles

### Creating an Admin Account

Admin accounts must be created directly in MongoDB (for security). Run this in your MongoDB shell or Compass:

```js
db.users.insertOne({
  name: "Admin User",
  email: "admin@loadwheel.com",
  password: "<bcrypt-hashed-password>",
  phone: "+91 9999999999",
  role: "admin",
  createdAt: new Date()
})
```

Or use the register API and then update the role:
```js
db.users.updateOne({ email: "admin@loadwheel.com" }, { $set: { role: "admin" } })
```

### Role Permissions Summary

| Feature | Customer | Driver | Admin |
|---|---|---|---|
| Book a truck | ✅ | ❌ | ❌ |
| View own bookings | ✅ | ❌ | ❌ |
| Live tracking | ✅ | ✅ | ❌ |
| Driver panel | ❌ | ✅ | ❌ |
| Toggle availability | ❌ | ✅ | ❌ |
| Broadcast GPS | ❌ | ✅ | ❌ |
| Admin dashboard | ❌ | ❌ | ✅ |
| Manage pricing | ❌ | ❌ | ✅ |
| View all users | ❌ | ❌ | ✅ |

---

## 📱 Pages & Screens

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Sign In | Public |
| `/register` | Create Account | Public |
| `/book` | Book a Truck | Customer |
| `/my-bookings` | Booking History | Customer |
| `/tracking/:id` | Live Tracking | Customer + Driver |
| `/driver` | Driver Dashboard | Driver |
| `/admin` | Admin Dashboard | Admin |

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd Frontend
npm run build
# Deploy the dist/ folder to Vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) and set:
```
Build Command:  npm run build
Output Dir:     dist
Root Directory: Frontend
```

Add environment variable in Vercel dashboard:
```
VITE_GOOGLE_MAPS_KEY = your_key_here
```

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set:
   ```
   Root Directory:  Backend
   Build Command:   npm install
   Start Command:   npm start
   ```
4. Add environment variables:
   ```
   PORT            = 5000
   MONGO_URI       = your_atlas_uri
   JWT_SECRET      = your_secret
   GOOGLE_MAPS_KEY = your_key
   ```

### Database → MongoDB Atlas

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user with read/write access
3. Whitelist `0.0.0.0/0` (all IPs) for cloud deployment
4. Copy the connection string and set it as `MONGO_URI`

> After deploying the backend, update the frontend's Vite proxy or Axios base URL to point to your live backend URL.

---

## 🔒 Security Notes

- Never commit your `.env` files to version control
- Both `.env` files are already in `.gitignore`
- Use a strong, random `JWT_SECRET` in production (min 32 characters)
- Restrict Google Maps API key to specific domains in the Google Cloud Console
- Use MongoDB Atlas IP allowlist in production instead of `0.0.0.0/0`

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  Built with ❤️ using the MERN Stack
</div>
