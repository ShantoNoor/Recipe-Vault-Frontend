import { Facebook, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import Logo from "./Logo";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="mb-4">
      <Separator orientation="horizontal" className="mb-4" />
      <div className="mx-auto items-center justify-between md:flex">
        <div
          className="inline-flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Logo />
          <span className="ml-4 text-lg font-bold">Recipe Vault</span>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-foreground">
            © 2024 Recipe Vault. All rights reserved.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex justify-center gap-4">
            <a
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/shantonoor/"
              title="Email"
              target="_blank"
              className="slide-from-right flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:rotate-12 duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              rel="noopener noreferrer"
              href="https://www.facebook.com/ShantoN00R/"
              title="Facebook"
              target="_blank"
              className="slide-from-right flex items-center justify-center w-10 h-10 rounded-full sm:w-10 sm:h-10 bg-primary text-white hover:rotate-12 duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              rel="noopener noreferrer"
              href="https://github.com/ShantoNoor"
              title="GitHub"
              target="_blank"
              className="slide-from-right flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:rotate-12 duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
