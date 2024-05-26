import useTheme from "@/hooks/useTheme";
import { BounceLoader } from "react-spinners";

const Spinner = () => {
  const {currentTheme} = useTheme();
  return (
    <div className="flex justify-center">
      <BounceLoader color={currentTheme === "light" ? "#f97316" : "#ea580c"} />
    </div>
  );
};

export default Spinner;
