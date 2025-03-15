import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import React from "react";

const LatestJobCarts = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`description/${job._id}`)}
      className="p-4 sm:p-5 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transition-transform hover:shadow-2xl hover:scale-105"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-medium text-lg truncate">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-purple-600 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-500 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCarts;
