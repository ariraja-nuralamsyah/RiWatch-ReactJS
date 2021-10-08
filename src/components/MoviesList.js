import React, { useState, useEffect } from "react";
import MovieDataService from "../services/MovieService";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    retrieveMovies();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    setCurrentMovie("");
    setCurrentIndex("");
  };

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch(e => {
        console.log(e);
      });
    MovieDataService.getGenres()
      .then(response => {
        setGenres(response.data.genres);
        console.log(response.data.genres);
      })
      .catch(e => {
        console.log(e);
      })
  };

  const setActiveMovie = (movie, index) => {
    setCurrentMovie(movie);
    setCurrentIndex(index);
  };

  const setMovieByGenre = (genreId) => {
    MovieDataService.getAllByGenre(genreId)
    .then(response => {
      setMovies(response.data.results);
      console.log(response.data.results);
    })
    .catch(e => {
      console.log(e);
    });
    setCurrentMovie("");
    setCurrentIndex("");
  }

  const findByTitle = () => {
    if(searchTitle != ""){
      MovieDataService.findByTitle(searchTitle)
      .then(response => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch(e => {
        console.log(e);
      });
    }else{
      retrieveMovies()
    }
    
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12" style={{overflow: 'scroll'}}>
        {genres.map((item, index) => (
          <button 
            key={index} 
            className="btn btn-primary mr-4 mt-2"
            onClick={() => setMovieByGenre(item.id)}
            >
              {item.name}
          </button>
        ))}
        <button
          key="populer"
          className="btn btn-primary mr-4 mt-2"
          onClick={() => retrieveMovies()}>
            Populer
        </button>
      </div>
      <div className="col-md-6" style={{overflow: 'scroll', height: '490px'}}>
        <h4>Movies List</h4>

        <ul className="list-group">
          {movies &&
            movies.map((movie, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveMovie(movie, index)}
                key={index}
              >
                {movie.title + " "} 
                <span className="badge badge-warning">Rate {movie.vote_average}</span> 
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentMovie ? (
          <div>
            <div>
              <h4>Movie</h4>
              <div>
                <img src={`https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`} alt="Not Found" width="100%"></img>  
              </div>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMovie.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentMovie.overview}
              </div>
              <div>
                <label>
                  <strong>Genres:</strong>
                </label>{" "}
                {currentMovie.genre_ids.map((id, index) => (
                  <button
                    className="badge badge-warning"
                    key={index}
                  >
                    {genres.filter(item => item.id === id)[0].name}
                  </button>
                ))}
                </div>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Movie...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
