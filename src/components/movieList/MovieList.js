import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieList.css";
import Card from "../card/Card";
import Loader from "../loader/Loader"; // Add a loader component

const MovieList = () => {
  const { type } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (type, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${page}`
      );
      setMovieList((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset movie list and page when the type changes
    setMovieList([]);
    setPage(1);
    fetchMovies(type, 1);
  }, [type]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(type, page);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="movie-list">
      <h2 className="list-title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list-cards">
        {movieList.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="load-more">
        {loading ? (
          <Loader />
        ) : (
          <button onClick={handleLoadMore} disabled={loading}>
            Load More
          </button>
        )}
      </div>

      {/* Error Handling */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default MovieList;
