import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchHandler = (cat) => {
    dispatch(setSearchQuery(cat));
    navigate("/browse");
  };

  return (
    <div className="w-full px-4 my-16">
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent className="-ml-2 flex">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Button
                onClick={() => searchHandler(cat)}
                variant="outline"
                className="w-full rounded-full py-3 text-sm sm:text-base"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
