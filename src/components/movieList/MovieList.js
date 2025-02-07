import React , {useEffect, useState} from 'react'
import './MovieList.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../card/Card'

const MovieList = () => {
    const {type} = useParams()
    const [movieList,setMovieList]=useState([])
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=706e15d89fc36b9625f164350ac09d39&language=en-US`).then(res=>{
            setMovieList(res.data.results);
        })
    },[])
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=706e15d89fc36b9625f164350ac09d39&language=en-US`).then(res=>{
            setMovieList(res.data.results);
        })
    },[type])
  return (
    <div className="movie-list">
            <h2 className="list-title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list-cards">
                {
                    movieList.map(movie => (
                        <Card movie={movie} />
                    ))
                }
            </div>
        </div>
  )
}

export default MovieList
