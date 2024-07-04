import React, { useState } from "react";
import location from '../../public/images/icons8-location.gif'
import search from '../../public/images/icons8-search-24.png'


const Banner = ({query,handleInputChange}) => {
    
  return (
    <div className="max-w-screen-2xl container xl:px-24 md:px-20 py-14">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find your <span className="text-bbbb">new job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in computer, engineering and technology sectors are
        waiting for u
      </p>

      <form>
        <div className="flex justify-start md:flex-row flex-col  md:gap-0 gap-4">
          <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 
          focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-200 md:w-1/2 w-full">
            <input
              type="text"   
              name="title"
              id="title"
              placeholder='What position are you looking for ?'
              className="block flex-1 border-0 text-center bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              value={query}
            />
            <img src={search} alt="Animated Location Icon" className=" absolute  w-6 h-6 mt-2 ml-2 " />
          
          </div>
          <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 
          focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-200 md:w-1/3 w-full">
            <input
              type="text"   
              name="title"
              id="title"
              placeholder='Location'
              className="block flex-1 border-0 text-center bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
            
            />
            
           <img src={location} alt="Animated Location Icon" className=" absolute ml-2 mt-2  w-6 h-6" />
          
          </div>
          <button type="submit" className="bg-bbbb py-2 px-8 text-white md:rounded-s-none rounded">Search</button>
          
        </div>
      </form>
    </div>
  );
};

export default Banner;
