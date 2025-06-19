import React from "react";

function MovieCard({ poster_path, name, movieObj, watchlist, handleAddToWatchli, handleRemoveFromWatchli }) {
  
  let doesContain = (movieObj) => {
    for(let i=0; i<watchlist.length; i++){
      if(watchlist[i].id == movieObj.id)
        return true;
    }
    return false;
  }
  
  return (
    <>

      <div
        className="h-[40vh] w-[150px] bg-cover rounded-xl transition-transform duration-300 hover:scale-110 flex flex-col justify-between items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      >

        {
          doesContain(movieObj)?
          (<div onClick={()=>(handleRemoveFromWatchli(movieObj))} className='m-2 bg-gray-900/60 flex justify-center h-8 w-8 items-center rounded-lg hover:cursor-pointer'>
          &#10060;
          </div>):
          (<div onClick={()=>(handleAddToWatchli(movieObj))} className='m-2 bg-gray-900/60 flex justify-center h-8 w-8 items-center rounded-lg hover:cursor-pointer'>
          &#128525;
        </div>)
        }

        
        <div className="text-white bg-gray-900/60 px-4 py-2 w-full text-center rounded-bl-xl rounded-br-xl">
          {name}
        </div>
      </div>
    </>
  );
}

export default MovieCard;
