import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const JobDetails = () => {
    const {id}= useParams();
    const [job,setJob]=useState([])
    useEffect (()=>{
      fetch(`http://localhost:3000/all-jobs/${id}`).then(res=>res.json()).then(data=>setJob(data))
    },[])

    const handleApply =async()=>{
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "URL address",
            inputPlaceholder: "Enter the URL"
          });
          if (url) {
            Swal.fire(`Entered URL: ${url}`);
          }
    }
  return (
    <div className='max-w-screen-2xl  container mx-auto xl:px-24 px-4'>
      {/* <h1>{job.jobTitle}</h1>
      <p>{job.jobDescription}</p>
      <p>{job.jobLocation}</p>
      <p>{job.salaryType}</p>
      <p>{job.jobType}</p>
      <p>{job.jobExperience}</p>
      <p>{job.jobSkills}</p>
      <p>{job.companyName}</p>
      <p>{job.description}</p>
      <p>{job.jobLocation}</p>
      <p>{job.postedby}</p>
      <p>{job.companyLogo}</p> */}
      <button className='bg-blue-500 text-white    text-xs font-bold uppercase px-8 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' onClick={handleApply}>Apply Now</button>
    </div>
  )
}

export default JobDetails
