import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getWatchlist, getFavorites } from "../services/userMovieApi";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  const [watchlistCount, setWatchlistCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const watchlist = await getWatchlist();
        const favorites = await getFavorites();

        setWatchlistCount(watchlist.length);
        setFavoritesCount(favorites.length);
      } catch (error) {
       
      }
    };

    loadStats();
  }, []);

  if (!user) return null;

  const initials = user.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your MovieSphere activity</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>

        <h2 className="profile-name">{user.username}</h2>
        <p className="profile-email">{user.email}</p>

        {memberSince && (
          <p className="profile-since">Member since {memberSince}</p>
        )}

        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-value">{watchlistCount}</div>
            <div className="profile-stat-label">Watchlist</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-value">{favoritesCount}</div>
            <div className="profile-stat-label">Favorites</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-value">Active</div>
            <div className="profile-stat-label">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;