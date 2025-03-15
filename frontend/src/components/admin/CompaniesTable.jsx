import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filterCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }

        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filterCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registerd companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead claaName="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <tr>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell claaName="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal></MoreHorizontal>
                  </PopoverTrigger>
                  <PopoverContent claaName="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 />
                      <span>Edit</span>
                    </div>
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

export default CompaniesTable;
