import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AvatarUpload from "@/components/AvatarUpload";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import photoUploader from "@/lib/photoUploader";
import { useAxiosSecure } from "@/hooks/useAxios";
import { Textarea } from "@/components/ui/textarea";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronsUpDown,
  PlusCircle,
} from "lucide-react";
import FormHeading from "./FormHeading";
import { recipeSchema } from "@/schemas/recipe.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import cuisines from "./data/cuisines.json";
import categories from "./data/categories.json";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import minutesToHoursAndMinutes from "@/lib/minutesToHoursAndMinutes";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Spinner from "@/components/Spinner";
import Ingredien from "./Ingredien";
import Title from "@/components/Title";
import getVideoId from "@/lib/getVideoId";

const steps = [
  {
    id: "Step 1",
    name: "General Information",
    details: "Please, provide information's about your recipe",
    fields: ["name", "image", "country", "category", "cookTime"],
  },
  {
    id: "Step 2",
    name: "Recipe Details",
    details: "Please, write your recipe in details",
    fields: ["instructions", "ingredients"],
  },
  {
    id: "Step 3",
    name: "Add Video",
    details: "Please, provide the YouTube Video of your recipe",
    fields: ["video"],
  },
  {
    id: "Step 4",
    name: "Complete",
    details: "Congratulations, your recipe is successfully added!!",
  },
];

const AddRecipe = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const [openCategories, setOpenCategories] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      cookTime: 5,
      author: "",
      ingredients: [
        {
          name: "",
          measure: "",
        },
        {
          name: "",
          measure: "",
        },
        {
          name: "",
          measure: "",
        },
      ],
      video: "",
    },
  });

  const { handleSubmit, reset, trigger, watch, setValue, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (user) {
      form.setValue("author", user?._id);
    }
  }, [user, form]);

  const processForm = (data) => {
    setLoading(true);
    toast.promise(
      axiosSecure.post(`/recipes`, data),
      {
        loading: "Adding recipe, Please wait ...",
        success: () => {
          reset();
          setLoading(false);
          return "Recipe added successfully";
        },
        error: (err) => {
          setLoading(false);
          setCurrentStep(2);
          toast.error("Failed to add recipe");
          return err.message;
        },
      }
    );
  };

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep === steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(0);
    } else if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <Title>Add Recipe</Title>
      <section className="flex flex-col justify-between gap-10">
        {/* page banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`bg-[url("https://e0.pxfuel.com/wallpapers/461/160/desktop-wallpaper-recipe-book-recipe-book-stock.jpg")] bg-no-repeat bg-cover bg-center md:p-10 rounded-lg`}
        >
          <PageHeader className="relative">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 0.75, height: "auto" }}
              className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg absolute inset-0 md:inset-4 lg:inset-12"
            />
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="z-[1] flex flex-col gap-1 items-center justify-center"
            >
              <PageHeaderHeading className="text-white">
                Add Your Own Recipe
              </PageHeaderHeading>
              <PageHeaderDescription className="text-zinc-100">
                Please, fill the septs properly to add your recipe.
              </PageHeaderDescription>
            </motion.div>
          </PageHeader>
        </motion.div>

        {/* steps */}
        <div aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group text-primary flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex text-primary w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-muted-foreground text-muted-foreground py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={handleSubmit(processForm)}>
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FormHeading step={steps[currentStep]} />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Your {`Recipe's`} Image</FormLabel>
                          <FormControl>
                            <AvatarUpload
                              value={field.value}
                              onChange={(value) => {
                                field.onChange(value);
                                photoUploader(value)
                                  .then((url) => field.onChange(url))
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                              rounded={false}
                              icon={<Camera className="size-16" />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator
                    className="hidden md:block ml-[90%]"
                    orientation="vertical"
                  />

                  <div className="space-y-6 md:col-span-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Your Recipe</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Your Recipe's Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Select the origin of your Recipe
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="capitalize text-muted-foreground font-medium">
                                <SelectValue placeholder="Select the origin country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cuisines.map((cuisine) => (
                                <SelectItem
                                  key={cuisine}
                                  value={cuisine}
                                  className="capitalize"
                                >
                                  {cuisine}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>
                            What category the recipe belongs to?
                          </FormLabel>
                          <Popover
                            open={openCategories}
                            onOpenChange={setOpenCategories}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between capitalize",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? categories.find(
                                        (categorie) =>
                                          categorie.name === field.value
                                      )?.name
                                    : "Select a category"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search category..." />
                                <CommandEmpty>No language found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-72 w-full rounded-md border">
                                    {categories.map((categorie) => (
                                      <CommandItem
                                        value={categorie.name}
                                        key={categorie.name}
                                        onSelect={() => {
                                          form.setValue(
                                            "category",
                                            categorie.name
                                          );
                                          setOpenCategories(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            categorie.name === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {categorie.name}
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cookTime"
                      render={({ fields }) => (
                        <FormItem>
                          <FormLabel>
                            How long does it take to prepare the recipe?
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={200}
                              step={1}
                              {...fields}
                              value={[watch("cookTime")]}
                              onValueChange={(value) =>
                                setValue("cookTime", value[0])
                              }
                              className="w-full"
                            />
                          </FormControl>
                          <FormDescription>
                            Use the slider adjust time:{" "}
                            {minutesToHoursAndMinutes(watch("cookTime"))}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FormHeading step={steps[currentStep]} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write how to prepare the recipe ... "
                              rows={40}
                              className="rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormItem>Ingredients</FormItem>
                    <div className="space-y-4 mt-2">
                      {fields.map((field, idx) => {
                        return (
                          <Card key={field.id} className="w-full">
                            <CardHeader className="relative">
                              <CardTitle>Ingredient</CardTitle>
                              <CardDescription>
                                Select the Name and Measure
                              </CardDescription>
                              <Button
                                className="absolute right-6 top-5"
                                variant="ghost"
                                onClick={() => remove(idx)}
                              >
                                Cancel
                              </Button>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <Ingredien form={form} idx={idx} />
                              <FormField
                                control={form.control}
                                name={`ingredients.${idx}.measure`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Measure</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="ingredient's measure .."
                                        type="text"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                    <Button
                      onClick={() => append({ name: "", measure: "" })}
                      type="button"
                      size="sm"
                      className="flex mx-auto mt-4 gap-4"
                    >
                      <PlusCircle className="size-4" />{" "}
                      <span>Add More Ingredient</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FormHeading step={steps[currentStep]} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 200 }}
                      exit={{ opacity: 0, x: 200 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <FormField
                        control={form.control}
                        name="video"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VideoURL</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="w-full"
                                placeholder="Please, provide your video url ..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Expected URL Formats: <br />
                              https://youtu.be/cuq1k82gQWI <br />
                              https://www.youtube.com/watch?v=cuq1k82gQWI
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>
                  <div className="md:col-span-2 ">
                    <div className="w-full flex justify-center items-center mx-auto aspect-video bg-muted text-destructive font-semibold text-xl rounded-md overflow-hidden">
                      {!watch("video") ? (
                        <p>No video url found!!</p>
                      ) : (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getVideoId(
                            watch("video")
                          )}`}
                        ></iframe>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {loading ? (
                  <div className="mt-8">
                    <Spinner />
                  </div>
                ) : (
                  <FormHeading step={steps[currentStep]} />
                )}
              </motion.div>
            )}
          </form>
        </Form>

        {/* Navigation */}
        <div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              variant="outline"
            >
              <ArrowLeft />
            </Button>
            <Button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              variant="outline"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRecipe;
