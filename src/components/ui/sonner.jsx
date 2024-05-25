import useTheme from "@/hooks/useTheme";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { currentTheme } = useTheme();

  return (
    <Sonner
      theme={currentTheme}
      offset={60}
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        className: "border shadow-md"
      }}
      {...props}
    />
  );
};

export { Toaster };
