import React from "react";
import {Link} from 'react-router-dom'
import {FiCalendar, FiClock, FiDollarSign, FiMapPin} from 'react-icons/fi'

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    maxPrice,
    minPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
  } = data;
  return (
    <section className="card">
        <Link to={`/job/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
            <img src={companyLogo} alt="" className="h-8 w-8"/>
            <div>
                <h4 className="text-primary mb-1">{companyName}</h4>
                <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
                <div className="text-primary/70 text-base flex flex-wrap mb-2">
                    <span className="flex items-centerb gap-2"><FiMapPin className="mt-1"/>{jobLocation}</span>
                    <span className="flex items-centerb gap-2"><FiClock className="mt-1 ml-2"/>{employmentType}</span>
                    <span className="flex items-centerb gap-2"><FiDollarSign className="mt-1 ml-2"/>{minPrice}-{maxPrice}k</span>
                    <span className="flex items-centerb gap-2"><FiCalendar className="mt-1 "/>{postingDate}</span>
                </div>
                <p className="text-base text-primary/70">{description}</p>
            </div>
        </Link>
    </section>
  );
};

export default Card;
