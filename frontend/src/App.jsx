import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import  Home from "../src/components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browes from "./components/Browes";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";

import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";


function App(){
  
  return <>
           <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/jobs" element={<Jobs/>}></Route>
            <Route path="/description/:id" element={<JobDescription/>}></Route>
            <Route path="/browse" element={<Browes/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>

            {/* for Admin panel */}

            <Route path="/admin/companies" element={ <ProtectedRoute> <Companies/> </ProtectedRoute>}></Route>
            <Route path="/admin/companies/create" element={<ProtectedRoute> <CompanyCreate/>  </ProtectedRoute>}></Route>
             <Route path="/admin/companies/:id" element={<ProtectedRoute> <CompanySetup/> </ProtectedRoute>}></Route> 
             <Route path="/admin/jobs" element={<ProtectedRoute> <AdminJobs/> </ProtectedRoute>}></Route> 
             <Route path="/admin/jobs/create" element={<ProtectedRoute> <PostJob/></ProtectedRoute>}></Route> 
             <Route path="/admin/jobs/:id/applications" element={<Applicants/>}></Route> 
           </Routes>
        </>
}
export default App;