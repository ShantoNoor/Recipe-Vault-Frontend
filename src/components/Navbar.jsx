import { CircleUser, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ui/mode-toggle";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import useAuth from "@/hooks/useAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Separator } from "./ui/separator";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="size-5 fill-current inline"
  >
    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
  </svg>
);

const NLink = ({ children, className, ...props }) => (
  <NavLink
    {...props}
    className={({ isActive, isPending }) =>
      isPending
        ? "pending"
        : isActive
        ? cn(
            className,
            "active transition-colors text-foreground/90 border px-4 py-[0.35rem] rounded-md"
          )
        : cn(
            className,
            "transition-colors text-foreground/90 border px-4 py-[0.35rem] rounded-md border-transparent hover:border-accent"
          )
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { user, signOut, googlePopUp } = useAuth();
  const navigate = useNavigate();

  const links = [
    { text: "Home", to: "/" },
    { text: "Recipes", to: "/recipes" },
  ];

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background z-20">
        <nav className="hidden flex-col gap-4 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
            <span className="text-nowrap">Recipe Vault</span>
          </Link>

          {links.map((link, idx) => (
            <NLink key={idx} to={link.to}>
              {link.text}
            </NLink>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-4 text-lg font-medium">
              <SheetClose asChild>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                  <span className="text-nowrap">Recipe Vault</span>
                </Link>
              </SheetClose>
              {links.map((link, idx) => (
                <SheetClose asChild key={idx}>
                  <NLink to={link.to}>{link.text}</NLink>
                </SheetClose>
              ))}
              {!user && (
                <>
                  <Separator />
                  <SheetClose asChild>
                    <Button
                      className="flex items-center gap-1 "
                      onClick={googlePopUp}
                    >
                      <GoogleIcon /> Google Login
                    </Button>
                  </SheetClose>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="flex-1" />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {user ? (
                    <Avatar className="size-9">
                      <AvatarImage src={user.photoURL} className="object-cover" />
                      <AvatarFallback>
                        {user.displayName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <CircleUser className="size-5" />
                  )}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/add-recipe">
                  <DropdownMenuItem className="cursor-pointer">
                    Add Recipe
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="flex flex-row justify-center items-center gap-1"
              onClick={googlePopUp}
            >
              <GoogleIcon /> <span className="hidden sm:inline">Google</span>{" "}
              <span>Login</span>
            </Button>
          )}
          <ModeToggle />
        </div>
      </header>
    </>
  );
};

export default Navbar;
