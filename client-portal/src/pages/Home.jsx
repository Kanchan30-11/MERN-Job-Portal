import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setjobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setjobs(data);
        setIsLoading(false);
      });
  }, []);

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //calculate the index range 
  const calulatePageRange =()=>{
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex, endIndex};
  }

  //function for next page
  const NextPage=()=>{
    if(currentPage <Math.ceil(filteredItems.length/itemsPerPage)){
      setCurrentPage(currentPage+1);
    }
  }
  //function for previous page
  const PreviousPage=()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }
  }


  // main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    //filtering  Input items
    if (query) {
      filteredJobs = filteredItems;
    }

    //category filtering
  //category filtering
if (selected) {
  filteredJobs = filteredJobs.filter(
    ({
      jobLocation,
      maxPrice,
      experienceLevel,
      salaryType,
      employmentType,
      postingDate,
    }) =>
      (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) ||
      (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
      (postingDate && postingDate >= selected) ||
      (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
      (experienceLevel && experienceLevel.toLowerCase() === selected.toLowerCase()) ||
      (employmentType && employmentType.toLowerCase() === selected.toLowerCase())
  );
  console.log(filteredJobs);
}


    const {startIndex,endIndex} = calulatePageRange();
    filteredJobs =filteredJobs.slice(startIndex,endIndex)
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left card */}
        <div className="bg-white rounded p-4">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* job card */}
        <div className="col-span-2 bg-white rounded-sm  p-4">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <>
              {" "}
              
              <Jobs result={result} />
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No Data Found!</p>
            </>
          )}
        {/* pagination here */}
        {
          result.length>0?(
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={PreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {Math.ceil(filteredItems.length/itemsPerPage)}</span>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={NextPage} disabled={currentPage ===Math.ceil(filteredItems.length/itemsPerPage)}
              >
                Next
              </button>
            </div>
          ):""
        }

        </div>
        {/* right card */}
        <div className="bg-white rounded p-4"><Newsletter/></div>
      </div>
    </div>
  );
};

export default Home;
