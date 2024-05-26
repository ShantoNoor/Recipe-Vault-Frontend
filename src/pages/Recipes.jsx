import Spinner from "@/components/Spinner";
import axiosPublic from "@/hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Image from "@/components/Image";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/Title";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MotionCard = motion(Card);
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import minutesToHoursAndMinutes from "@/lib/minutesToHoursAndMinutes";
import { Button } from "@/components/ui/button";

const countries = ["italian", "chinese", "indian", "mexican", "japanese"];
import categoriesJson from "../pages/AddRecipe/data/categories.json";
import InfiniteScroll from "react-infinite-scroll-component";
import useDebounce from "@/hooks/useDebounce";
const categories = categoriesJson.map((category) => category.name);

const Recipes = () => {
  const navigate = useNavigate();
  const [disableNavigation, setDisableNavigation] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750)

  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");

  const { data, fetchNextPage, hasNextPage, error, isPending } =
    useInfiniteQuery({
      queryKey: ["recipes", "all-recipes", debouncedSearch, country, category],
      queryFn: async ({ pageParam = 0 }) => {
        try {
          const result = await axiosPublic.get(
            `/all-recipes?limit=10&offset=${pageParam}&search=${debouncedSearch}&country=${country}&category=${category}`
          );
          return { ...result.data, prevOffset: pageParam };
        } catch (err) {
          console.error("Error fetching recipes:", err);
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.prevOffset + 10 > lastPage.recipesCount) {
          return undefined;
        }

        return lastPage?.prevOffset + 10;
      },
    });
  const recipes = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.recipes];
  }, []);

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>All Recipes</Title>
      <div className="mb-8 space-y-6">
        <div className="mt-3 space-y-2">
          <h2>Search by Recipe Name</h2>
          <Input
            type="search"
            placeholder="Search recipe here ... "
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-3 space-y-2">
            <h2>Filter Recipes by Country</h2>
            <Select
              value={country}
              onValueChange={(value) => {
                setDisableNavigation(true);
                setCountry(value);
                setTimeout(() => {
                  setDisableNavigation(false);
                }, 500);
              }}
              defaultValue={country[0]}
            >
              <SelectTrigger className="capitalize">
                <SelectValue
                  placeholder="Select a Country Origin"
                  className="text-muted"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((cuisine) => (
                    <SelectItem
                      key={cuisine}
                      value={cuisine}
                      className="capitalize"
                    >
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-3 space-y-2">
            <h2>Filter Recipes by Category</h2>
            <Select
              value={category}
              onValueChange={(value) => {
                setDisableNavigation(true);
                setCategory(value);
                setTimeout(() => {
                  setDisableNavigation(false);
                }, 500);
              }}
              defaultValue={categories[0]}
            >
              <SelectTrigger className="capitalize">
                <SelectValue
                  placeholder="Select a Category Origin"
                  className="text-muted"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((cuisine) => (
                    <SelectItem
                      key={cuisine}
                      value={cuisine}
                      className="capitalize"
                    >
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button
            size="sm"
            onClick={() => {
              setSearch("");
              setCountry("");
              setCategory("");
            }}
          >
            Clear Filter
          </Button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={recipes ? recipes.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>Loading ....</div>}
      >
        <div className="grid grid-cols-1 gap-6 mb-6">
          {recipes.map((recipe) => (
            <MotionCard
              key={recipe._id}
              className="flex flex-col overflow-hidden rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              viewport={{ once: true }}
            >
              <div className="px-4">
                <Separator />
              </div>
              <CardContent className="p-4 relative flex flex-col md:flex-row gap-4">
                <div className="md:w-[60%]">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    className="object-cover w-full h-[22rem] rounded-md"
                  />
                </div>
                <div className="md:w-[40%] flex flex-col justify-between gap-4">
                  <div className="text-center border p-4 rounded-md">
                    <CardTitle className="mb-1 text-xl font-semibold">
                      {recipe.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      • Origin:{" "}
                      <span className="capitalize">{recipe.country}</span>
                    </CardDescription>
                    <CardDescription className="text-xs mt-2">
                      • Purchased By: {recipe.purchasedBy.length} peoples!
                    </CardDescription>
                    <CardDescription className="text-xs mt-2">
                      • Cook Time: {minutesToHoursAndMinutes(recipe.cookTime)}
                    </CardDescription>
                  </div>

                  <Separator />
                  <CardHeader className="flex flex-row gap-4 items-center bg-accent rounded-md">
                    <Avatar>
                      <AvatarImage
                        src={recipe.author.photoURL}
                        className="object-cover rounded-full shadow"
                      />
                      <AvatarFallback>
                        {recipe.author.displayName}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-semibold">
                        {recipe.author.displayName}
                      </span>
                      <span className="text-xs">{recipe.author.email}</span>
                    </div>
                  </CardHeader>

                  <Separator />

                  <Button
                    variant="outline"
                    onClick={() =>
                      !disableNavigation &&
                      navigate(`/view-recipe/${recipe._id}`)
                    }
                  >
                    View The Recipe
                  </Button>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Recipes;
