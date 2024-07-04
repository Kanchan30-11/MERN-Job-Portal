import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';

const PostJob = () => {
    const [selectedOption,setSelectedOption]=useState(null);
    
  const {
    register,
    handleSubmit,reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills= selectedOption,
     console.log(data);
    fetch("http://localhost:3000/post-job",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(res=>res.json()).then((result)=>{
      console.log(result);
      if(result.acknowledged===true){
        alert("Job Posted Successfully")
      }
      reset()
    
    })
}
  
  const options =[
  {value:"JavaScript", label:"JavaScript"},
  {value:"C++", label:"C++"},
  {value:"Python", label:"Python"},
  {value:"Java", label:"Java"}, 
  {value:"Ruby", label:"Ruby"},
  {value:"HTML",label:"HTML"},
  {value:"CSS", label:"CSS"},
  {value:"MongoDB", label:"MongoDB"},
  {value:"Redux", label:"Redux"},
  {value:"Node js", label:"Node js"},
  {value:"React", label:"React"},
  {value:"Tailwind", label:"tailwind"},
  {value:"Graphic Design", label:"Graphic Design"},
  {value:"Adobe", label:"Adobe"},
  {value:"Figma", label:"Figma"},
  ]

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* from */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           {/* 1st row  */}
         <div className=" create-job-flex">
          
            <div className="lg:w-1/2 w-full">
              <label className="block mb-3 text-lg">Job Title</label>
              <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} 
              className="create-job-input"/>
            </div>
              
            <div className="lg:w-1/2 w-full">
              <label className="block mb-3 text-lg">Company Name</label>
              <input type="text" placeholder="Ex: Microsoft" {...register("companyName")} 
              className="create-job-input"/>
            </div>
         </div>
          {/* 2nd row  */}
         <div className=" create-job-flex">
          
            <div className="lg:w-1/2 w-full">
              <label className="block mb-3 text-lg">Minimum Salary</label>
              <input type="text" placeholder="$20k" {...register("minPrice")} 
              className="create-job-input"/>
            </div>
              
            <div className="lg:w-1/2 w-full">
              <label className="block mb-3 text-lg">Maximum Salary</label>
              <input type="text" placeholder="$120k" {...register("maxPrice")} 
              className="create-job-input"/>
            </div>
         </div>
          {/* 3rd row  */}
          <div className=" create-job-flex">
          
          <div className="lg:w-1/2 w-full">
            <label className="block mb-3 text-lg">Salary Type</label>
            <select {...register("salaryType")} className="create-job-input">
        <option value="">Choose your salary</option>
        <option value="Hourly">Hourly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      
      </select>
          </div>
            
          <div className="lg:w-1/2 w-full">
            <label className="block mb-3 text-lg">Job Locations</label>
            <input type="text" placeholder="Ex: Jhansi" {...register("jobLocation")} 
            className="create-job-input"/>
          </div>
       </div>
          {/* 4th row  */}
          <div className=" create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-3 text-lg">Job Posting Date</label>
            <input type="date" placeholder="Ex: 2024-04-17" {...register("postingDate")} 
            className="create-job-input"/>
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-3 text-lg">Experience Level</label>
            <select {...register("salaryType")} className="create-job-input">
        <option value="">Choose your Experience</option>
        <option value="NoExperience">No Experience</option>
        <option value="Internship">Internship</option>
        <option value="Work remotely">Work remotely</option>
      
      </select>
          </div>
            
         
       </div>
        {/* 5th row  */}
        <div>
        <label className="block mb-3 text-lg">Required Skill Sets:</label>
          <CreatableSelect
          className="create-job-input py-4"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isMulti/>
        </div>
        {/* 6th row  */} 
        <div className=" create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-3 text-lg">Company Logo</label>
            <input type="url" placeholder="Paste your Company Logo URL: https://anylogo.com" {...register("companyLogo")} 
            className="create-job-input"/>
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-3 text-lg">Experience Type</label>
            <select {...register("employmentType")} className="create-job-input">
        <option value="">Choose your Employment Type</option>
        <option value="Full-time">Full Time</option>
        <option value="Part-time">Part Time</option>
        <option value="Temporary">Temporary</option>
      
      </select>
          </div>
            
         
       </div>
       {/* 7th row  */}
       <div className="w-full">
        <label className="block mb-3 text-lg">Job Description</label>
        <textarea {...register("description")} className="w-full pl-3 py-1.5 focus:outline-none"
        rows={6} 
        placeholder="Job Description"
        defaultValue={"A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support."}/>
       </div>
         {/* last row  */}
         <div>
         <label className="block mb-3 text-lg">Job Posted By</label>
         <input type="email" placeholder="your email" {...register("postedby")} 
              className="create-job-input"/>
         </div>

          <input type="submit" className="block mt-12 bg-blue-600 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"/>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
