import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";

const Banner = () => {
  const navigate = useNavigate();
  const { user, googlePopUp } = useAuth();
  const { currentTheme } = useTheme();
  return (
    <section
      className={`relative overflow-hidden bg-no-repeat bg-cover bg-center rounded-lg bg-[url("https://c1.wallpaperflare.com/preview/743/182/516/ingredients-cooking-preparation-spices.jpg")]`}
    >
      <motion.div
        initial={{ x: "-250%" }}
        animate={{ x: 0 }}
        transition={{
          duration: 0.5,
          bounce: 2,
        }}
        className={`inset-0 clip-path absolute bg-gradient-to-r ${
          currentTheme === "light" ? "from-rose-100/90" : "from-rose-900/90"
        } to-orange-500/30`}
      />
      <motion.div
        initial={{ x: "-250%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between"
      >
        <div className="z-[1] flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-3xl font-bold leadi md:text-5xl">
            <span className="text-primary">Recipe</span>Vault {":)"}
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Unlock a world of culinary treasures. <br /> Unveiling flavors, one
            recipe at a time. Discover your next favorite dish in Recipe Vault.
          </p>
          <motion.div
            initial={{ x: "-250%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start"
          >
            <Button
              className="px-8 py-3 text-lg font-semibold rounded"
              size="lg"
              onClick={() => navigate("/recipes")}
            >
              See Recipes
            </Button>
            <Button
              className="px-8 py-3 text-lg font-semibold border rounded"
              size="lg"
              variant="outline"
              onClick={async () => {
                if (user) navigate("/add-recipe");
                else {
                  await googlePopUp();
                  navigate("/add-recipe");
                }
              }}
            >
              Add Recipess
            </Button>
          </motion.div>
        </div>
        <div className="flex items-center justify-center p-6 lg:mt-0 "></div>
      </motion.div>
    </section>
  );
};

export default Banner;
