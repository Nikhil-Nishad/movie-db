import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList.js";


const Homepage = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
      );
      setMovie((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="homepage">
      {/* Carousel Section */}
      {movie.length > 0 && (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          stopOnHover={false}
          infiniteLoop={true}
          showStatus={false}
        >
          {movie.slice(0, 5).map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div className="posterImage__runtime">
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie.overview.length > 100
                    ? movie.overview.substring(0, 100) + "..."
                    : movie.overview}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}

      {/* Movie List Section */}
      <MovieList movies={movie} />

      {/* Error Handling */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Homepage;
