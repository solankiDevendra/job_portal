import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const isInitiallyApplied = singleJob?.application?.some(
    (application) => application.applicant === user?._id
  );

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      {/* Job Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Position
            </Badge>
            <Badge className="text-purple-600 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-green-500 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={applyJobHandler}
          className={`mt-4 sm:mt-0 rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-700 hover:bg-indigo-900"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description */}
      <h1 className="border-b-2 border-gray-300 font-medium py-5 mt-6">
        Job Description
      </h1>
      <div className="my-4 text-sm sm:text-base">
        <p className="font-bold">
          Role:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </p>
        <p className="font-bold">
          Location:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </p>
        <p className="font-bold">
          Description:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </p>
        <p className="font-bold">
          Experience:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </p>
        <p className="font-bold">
          Salary:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </p>
        <p className="font-bold">
          Total Applicants:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.application?.length}
          </span>
        </p>
        <p className="font-bold">
          Posted Date:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
