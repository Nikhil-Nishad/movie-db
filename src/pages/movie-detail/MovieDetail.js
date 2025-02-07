import axios from 'axios'
import React, { useEffect , useState} from 'react'
import './MovieDetail.css'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
    const [movie, setMovie] = useState()
    const {id}= useParams();
    useEffect(()=>{
        console.log(id);
        console.log("movie detail page");
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key={f1744c70c20f687803a8154c388fcaa1}&language=en-US`)
        .then(res=>{
            setMovie(res.data);
        })
    },[])
  return (
    <div className='movie'>
      <div className="movie-intro">
        <img src={`https://image.tmdb.org/t/p/original${movie ? movie.backdrop_path : ""}`} />
      </div>
      <div className="movie-detail">
        <div className='movie-detail-left'>
            <div className="movie-posterBox">
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
            </div>
        </div>
        <div className='movie-detail-right'>
        <div className="movie-detailRightTop">
          <div className="movie-name">{movie ? movie.original_title : ""}</div>
          <div className="movie-tagline">{movie ? movie.tagline : ""}</div>
          <div className="movie-rating">
              {movie ? movie.vote_average: ""} <i class="fas fa-star" />
              <span className="movie-voteCount">{movie ? "(" + movie.vote_count + ") votes" : ""}</span>
          </div>  
          <div className="movie-runtime">{movie ? movie.runtime + " mins" : ""}</div>
          <div className="movie-releaseDate">{movie ? "Release date: " + movie.release_date : ""}</div>
          <div className="movie-genres">
              {
                  movie && movie.genres
                  ? 
                  movie.genres.map(genre => (
                      <><span className="movie-genre" id={genre.id}>{genre.name}</span></>
                  )) 
                  : 
                  ""
              }
          </div>
        </div>
        <div className="movie-detailRightBottom">
          {/* <div className="synopsisText">Synopsis</div> */}
          <div>{movie ? movie.overview : ""}</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MovieDetail
