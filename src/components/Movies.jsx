import React from "react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({watchlist, handleAddToWatchli, handleRemoveFromWatchli}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if(pageNo == 1){
      setPageNo(1);
    }
    else{
      setPageNo(pageNo-1);
    }
    
  }

  const handleNext = () => {
    setPageNo(pageNo+1);
  }

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=c4484ea79fcf60d07447bd7d7945b058&with_original_language=te&sort_by=release_date.desc&release_date.lte=${todayDate}&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      }, [pageNo]);
  });

  return (
    <>
      <div className="m-4">
      <div className="font-bold text-2xl text-center p-4">Trending Movies</div>
      <div className="flex flex-wrap justify-around gap-[1rem]">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              poster_path={movieObj.poster_path}
              name={movieObj.title}
              movieObj = {movieObj}
              watchlist = {watchlist}
              handleAddToWatchli={handleAddToWatchli}
              handleRemoveFromWatchli={handleRemoveFromWatchli}
            />
          );
        })}
      </div>
    </div>

    <div>
      <Pagination handlePrev={handlePrev} handleNext={handleNext} pageNo={pageNo}/>
    </div>
    </>
    
  );
}

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=c4484ea79fcf60d07447bd7d7945b058&language=en-US&page=1
// https://api.themoviedb.org/3/discover/movie?api_key=c4484ea79fcf60d07447bd7d7945b058&with_original_language=te&sort_by=release_date.desc&release_date.lte=${todayDate}&page=${pageNo}