import logo from "/logo.svg";
import logoDark from "/logo_dark.svg";
import useTheme from "@/hooks/useTheme";

const Logo = () => {
  const { currentTheme } = useTheme();
  return (
    <>
      <span className="w-6 h-6">
        <img
          src={currentTheme !== "dark" ? logoDark : logo}
          alt="Logo"
          className="fill-current"
        />
      </span>
    </>
  );
};

export default Logo;
