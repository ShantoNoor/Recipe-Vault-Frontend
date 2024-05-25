import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <main className="container flex flex-col min-h-screen">
      <Navbar />
      <div className="my-4 flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
