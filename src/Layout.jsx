import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAxiosSecure } from "./hooks/useAxios";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./lib/firebase.config";
import useAuth from "./hooks/useAuth";

const auth = getAuth(app);

const Layout = () => {
  const axiosSecure = useAxiosSecure();
  const {setUser, setLoading} = useAuth()

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email && localStorage.getItem('accessToken')) {
        try {
          const userInfo = await axiosSecure.get(
            `/users?email=${currentUser?.email}`
          );
          setUser(userInfo.data[0]);
        } catch (err) {
          console.error(err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [setLoading, setUser]);

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
