import React,{useEffect, useState} from 'react'
import PageHeader from '../components/PageHeader'

const EstimateSalary = () => {
    const [searchText, setSearchText] = useState("");
    const [salary,setSalary] =useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        fetch("salary.json").then(res=>res.json()).then(data=>setSalary(data))
    },[searchText])
    const handleSearch = (event) => {
        const filter = salary.filter(
          (job) =>
            job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
         console.log(filter);
        setSalary(filter);
    
      };

  return (
    <div className='max-w-screen-2xl container mx-auto  xl:px-4 px-4 '>
      <PageHeader title={"Estimate Salary"} path={"Salary"}/>

      <div className='mt-5'>
      <div className='search-box p-2 text-center mb-2'>
        <input type='text' placeholder='Search' className='lg:w-6/12 mb-4 w-full  py-2 pl-3 border focus:outline-none '
        onChange={(e)=>setSearchText(e.target.value)}/>
        <button onClick={handleSearch} className='bg-blue-600 rounded-sm text-white cursor-pointer mb-4  px-8 py-2 font-semibold'>Search</button>
      </div>
      </div>
      {/* salary display card */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-12 my-2 items-center'>
         {
            salary.map((data)=>(
                <div key={data.id} className='shadow-lg px-4 py-8'>
                <h2 className='font-semibold text-xl '>{data.title}</h2>
                <p className='my-2  font-medium text-blue-600 text-lg'>{data.salary}</p>
                <div className='flex flex-wrap gap-4'>
                    <a href='/' className='underline '>{data.status}</a>
                    <a href='/' className='underline '>{data.skills}</a>
                </div>
                </div>
            ))
         }
      </div>
    </div>
  )
}

export default EstimateSalary
