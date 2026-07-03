# 🎬 MovieSphere

MovieSphere is a full-stack MERN movie discovery platform that allows users to explore movies, watch trailers, save favorites, maintain a watchlist, write reviews, and receive AI-powered movie recommendations.

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 🎥 Browse Trending, Popular and Top Rated Movies
- 🔍 Search Movies
- 📄 Movie Details Page
- ▶️ Watch Official Movie Trailers
- ❤️ Add Movies to Favorites
- 📋 Add Movies to Watchlist
- ⭐ Write and Delete Reviews
- 🤖 AI Movie Recommendations (Gemini API with fallback support)
- 👤 User Profile
- 🔔 Toast Notifications
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- React Toastify
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- MongoDB
- Mongoose

### APIs
- TMDB API
- Google Gemini API

---

## 📂 Project Structure

```
MovieSphere
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   └── assets
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── services
│   └── config
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>
cd MovieSphere
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

TMDB_ACCESS_TOKEN=YOUR_TMDB_ACCESS_TOKEN

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Search
- Movie Details
- AI Recommendations
- Watchlist
- Favorites
- Profile

---

## 🌟 Future Improvements

- Edit Reviews
- Infinite Scroll
- Movie Recommendations based on Watchlist
- Advanced Filters
- Better AI Personalization

---

## 👨‍💻 Author

**Arman Raj**
