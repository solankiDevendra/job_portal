import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Footer from "../shared/Footer";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto  mt-40">
        <div className="flex items-center justify-between my-5">
          <Input 
          onChange={(e)=>setInput(e.target.value)}
           className="w-fit" 
           placeholder="Filter by name"></Input>
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Cmpany
          </Button>
        </div>
        <CompaniesTable></CompaniesTable>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Companies;
