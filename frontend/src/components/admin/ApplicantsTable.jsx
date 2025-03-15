import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingstatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      // axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.application?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item.applicant?.profile.resumeOriginalname ? (
                    <a
                      className="text-blue-700 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalname}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>

                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingstatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
