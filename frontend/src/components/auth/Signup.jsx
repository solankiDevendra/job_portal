import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const validateForm = () => {
    let newErrors = {};
    if (!input.fullName) newErrors.fullName = "Full name is required.";
    if (!input.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!input.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      newErrors.phoneNumber = "Phone number must contain only digits.";
    } else if (input.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!input.password) {
      newErrors.password = "Password is required.";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!input.role) newErrors.role = "Please select a role.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Signup failed.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-md"
        >
          <h1 className="font-bold text-2xl text-center mb-5">Signup</h1>

          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between my-3">
            <RadioGroup className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label>Student</Label>
              </div>
            </RadioGroup>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 my-3">
            <Label>Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
