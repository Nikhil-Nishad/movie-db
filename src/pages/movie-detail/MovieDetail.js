import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import Loader from "../../components/loader/Loader"; // Add a loader component

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="movie-detail">
      {/* Backdrop Image */}
      <div className="movie-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.original_title}
        />
      </div>

      {/* Movie Content */}
      <div className="movie-content">
        {/* Poster and Basic Info */}
        <div className="movie-poster-info">
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
          <div className="movie-basic-info">
            <h1 className="movie-title">{movie.original_title}</h1>
            <p className="movie-tagline">{movie.tagline}</p>
            <div className="movie-rating">
              <span className="star-icon">⭐</span> {movie.vote_average}{" "}
              <span className="vote-count">({movie.vote_count} votes)</span>
            </div>
            <div className="movie-runtime">{movie.runtime} mins</div>
            <div className="movie-release-date">
              Release Date: {movie.release_date}
            </div>
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="movie-genre">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="movie-overview">
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
