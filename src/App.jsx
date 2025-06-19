import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Movies from "./components/Movies.jsx";
import Watchlist from "./components/Watchlist.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner.jsx";
import { useEffect, useState } from "react";


function App() {
  let [watchlist, setWatchlist] = useState([]);
  

  let handleAddToWatchli = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("moviesApp",JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);

  };

  let handleRemoveFromWatchli = (movieObj) => {
    let filterWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    localStorage.setItem("moviesApp",JSON.stringify(filterWatchlist));
    setWatchlist(filterWatchlist);
  };

  

  useEffect(() => {
    let localStorageData = localStorage.getItem("moviesApp");
    if(!localStorageData ) return
    setWatchlist(JSON.parse(localStorageData));
  },[])



  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies
                  watchlist={watchlist}
                  handleAddToWatchli={handleAddToWatchli}
                  handleRemoveFromWatchli={handleRemoveFromWatchli}
                />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist  watchlist={watchlist} setWatchlist={setWatchlist} handleRemoveFromWatchli={handleRemoveFromWatchli}/>} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
