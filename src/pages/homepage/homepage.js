import React, { useEffect, useState } from 'react';
// const axios =require (axios)
import axios from 'axios';
import './homepage.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import Card from '../../components/card/Card';
import MovieList from '../../components/movieList/MovieList';

const Homepage = () => {
    const [movie,setMovie]=useState([])
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=f1744c70c20f687803a8154c388fcaa1`).then(res=>{
            setMovie(res.data.results);
        })
    },[])
    console.log(movie);
  return (
    <div className='poster'>
      {movie.length>0?(
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          stopOnHover={false}
          // interval={3000}
          infiniteLoop={true}
          showStatus={false}
        >
        {
        movie.map(movie => (
          <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
            <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
            </div>
            <div className="posterImage__overlay">
                <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                        {movie ? movie.vote_average :""}
                        <i className="fas fa-star" />{" "}
                    </span>
                </div>
                <div className="posterImage__description">{movie ? movie.overview : ""}</div>
            </div>
          </Link>
        ))
        }
      </Carousel>
      ) :null}
      <MovieList/>      
    </div>
  )
}

export default Homepage
