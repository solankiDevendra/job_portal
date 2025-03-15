import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100 transition-transform duration-200 hover:scale-105 mt-20">
      {/* Time & Bookmark */}

      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      {/* Company Details */}
      <div className="flex items-center gap-2 my-2">
        <Button className="p-5 sm:p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-sm sm:text-lg">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-base sm:text-lg my-2">{job?.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* Job Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
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

      {/* Action Buttons */}
      <div className=" mt-4">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
