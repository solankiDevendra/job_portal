import React from "react";
import LatestJobCarts from "./LatestJobCarts";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJobs = () => {
  useGetAllJobs(); // Fetch jobs on mount

  const { allJobs } = useSelector((state) => state.job);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        <span className="text-indigo-700">Latest & Top </span>Job Openings
      </h1>

      {allJobs.length === 0 ? (
        <p className="text-center text-gray-600 mt-5">No Job Available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCarts key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
