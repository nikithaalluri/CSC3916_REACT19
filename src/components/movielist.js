import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link } from 'react-router-dom';
import { Image, Nav, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);

    // Memoize the movies array
    const memoizedMovies = useMemo(() => {
        return movies;
    }, [movies]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
      console.log("Fetched movies:", movies);  // Debugging log
    }, [movies]);

    const handleSelect = (selectedIndex) => {
      if (!memoizedMovies || memoizedMovies.length === 0) return; // Ensure data is present
      dispatch(setMovie(memoizedMovies[selectedIndex]));
    };

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    };

    if (!memoizedMovies || !Array.isArray(memoizedMovies) || memoizedMovies.length === 0) { // Use memoizedMovies here
        return <div>Loading....</div>;
    }

    return (
        <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
          {memoizedMovies.map((movie) => (
            <Carousel.Item key={movie._id}>
              {/* Use Nav.Link with "as={Link}" to avoid nested anchors */}
              <Nav.Link
                as={Link}
                to={`/movie/${movie._id}`}
                onClick={() => handleClick(movie)}
              >
                <Image className="image" src={movie.imageUrl} thumbnail />
              </Nav.Link>
              <Carousel.Caption>
                <h3>{movie.title}</h3>
                <BsStarFill /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }

export default MovieList;