import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";
import Footer from "../shared/Footer";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar></Navbar>

      <div className="max-w-7xl mx-auto  mt-40">
        <h1 className="font-bold text-xl my-5">
          Applications {applicants?.application?.length}
        </h1>
        <ApplicantsTable></ApplicantsTable>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Applicants;
