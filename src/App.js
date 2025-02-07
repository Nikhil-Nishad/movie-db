import './App.css';
import {BrowserRouter, Routes, Route,useParams } from "react-router-dom";
import Homepage from './pages/homepage/homepage';
import MovieDetail from './pages/movie-detail/MovieDetail';
import MovieList from './components/movieList/MovieList';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route index element={<Homepage/>}></Route>
          <Route exact path="/movies/:type" element={<MovieList/>}></Route>
          <Route exact path="/movie/:id" element={<MovieDetail/>}></Route>
          <Route path="/*" element={<h1>error page</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
