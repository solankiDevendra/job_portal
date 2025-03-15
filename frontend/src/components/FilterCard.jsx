import { useDispatch } from "react-redux";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import React, { useEffect, useState } from "react";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Banglore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "Kolkata",
      " Chandigarh",
      "Ahmedabad",
      "Noida",
      "Indore",
      "Patna",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      " Full Stack Developer",
      "Software Developer",
      "Cloud Computing",
      "Cybersecurity",
      "AI Engineer",
      "Data Science",
      "UI/UX Design & Development",
      "Mobile App Development",
      "DevOps",
    ],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelecetedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {

    setSelecetedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, ind) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item) => {
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item}></RadioGroupItem>
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
