import React, { useState, useEffect } from "react";
import { genres } from "../genreIds";

function Watchlist({ watchlist, setWatchlist, handleRemoveFromWatchli }) {
  const [search, setSearch] = useState("");
  let [genreList, setGenreList] = useState([0]);
  let [curGenre, setCurGenre] = useState('All Genres');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortIncreasing = () => {
    const sorted = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sorted]);
  };

  const sortDecreasing = () => {
    const sorted = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sorted]);
  };

  useEffect(() => {
    const genreSet = new Set();
    watchlist.forEach((movieObj) => {
      const genreId = movieObj.genre_ids[0];
      genreSet.add(genreId);
    });

    setGenreList([0, ...Array.from(genreSet)]);
  }, [watchlist]);

  let handleGenreFilter = (genreId) => {
    setCurGenre(genres[genreId]);
  }

  return (
    <>
      <div className="flex justify-center m-4 space-x-8">
        {genreList.map((genre) => {
          
          return (
            
            <div key={genre} onClick={()=>handleGenreFilter(genre)} className= {curGenre === genres[genre]?"font-semibold bg-blue-400 rounded-xl p-2 w-[15vh] flex justify-center text-white ":"font-semibold bg-gray-400/50 rounded-xl p-2 w-[15vh] flex justify-center text-white transition duration-400 hover:bg-blue-400"}>
              {genres[genre]}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center m-6">
        <input
          onChange={handleSearch}
          className="bg-gray-200 outline-none h-[5vh] w-[35vh] px-4"
          type="text"
          placeholder="Search movies"
        />
      </div>

      <div className="border rounded-lg overflow-hidden border-gray-200 m-8">
        <table className="w-full text-center">
          <thead className="border-b-2 text-gray-700">
            <tr>
              <th>Name</th>
              <th className="flex space-x-4 justify-center">
                <div onClick={sortIncreasing}>
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div>Ratings</div>
                <div onClick={sortDecreasing}>
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>

              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody className="text-gray-600">
            {watchlist.filter((movieObj) => {
              if(curGenre  === "All Genres") return true;
              else{
                return genres[movieObj.genre_ids[0]] === curGenre;
              }
            }).filter((movieObj) => {
                return (movieObj || "").title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movieObj) => (
                <tr key={movieObj.id} className="border-b-2">
                  <td className="flex items-center px-6 py-3">
                    <img
                      className="h-[10vh] w-[15vh]"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                    ></img>
                    <div className="mx-8">{movieObj.title}</div>
                  </td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{genres[movieObj.genre_ids[0]]}</td>

                  <td
                    onClick={() => handleRemoveFromWatchli(movieObj)}
                    className="text-red-800 hover:cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
