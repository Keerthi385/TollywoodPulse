import React from 'react'

function Pagination({handlePrev, handleNext, pageNo}) {
  return (
    <div className='text-xl flex justify-center items-center space-x-6 font-bold bg-gray-400 p-3 m-8'>
      <div onClick={handlePrev} className="hover:cursor-pointer"> <i className="fa-solid fa-arrow-left"></i> </div>
      <div>{pageNo}</div>
      <div onClick={handleNext} className="hover:cursor-pointer"> <i className="fa-solid fa-arrow-right"></i> </div>
    </div>
  )
}

export default Pagination