import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  });

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto  mt-40">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter By Role"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable></AdminJobsTable>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AdminJobs;
