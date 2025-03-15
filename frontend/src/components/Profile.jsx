import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mt-20 p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-600" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-600" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-bold text-lg">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm gap-2">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resumeOriginalname ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalname}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <div className="overflow-x-auto">
          <AppliedJobTable />
        </div>
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer></Footer>
    </div>
  );
};

export default Profile;
