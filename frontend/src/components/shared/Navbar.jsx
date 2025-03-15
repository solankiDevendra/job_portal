import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, User2, Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">
            <Link to="/">
              Job<span className="text-indigo-600">Portal</span>
            </Link>
          </h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute sm:relative top-16 sm:top-auto left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none transition-all ${
            menuOpen ? "block" : "hidden sm:flex"
          } flex-col sm:flex-row sm:items-center gap-5 p-4 sm:p-0`}
        >
          <ul className="flex flex-col sm:flex-row font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 sm:mt-0">
              <Link to="/login">
                <Button variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-900">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-2">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-gray-600">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
