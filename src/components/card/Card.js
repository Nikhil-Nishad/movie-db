import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Card.css";

   
const Card = ({ movie }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle card click
    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`); // Navigate to the movie detail page
    };
  return (
    <div className="card" onClick={handleCardClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="card-image"
      />
      <div className="card-content">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-date">{movie.release_date}</p>
        <p className="card-rating">
          <span className="star-icon">⭐</span> {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Card);
