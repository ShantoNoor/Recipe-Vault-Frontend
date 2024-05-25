import { createContext, useEffect, useState } from "react";
import app from "@/lib/firebase.config.js";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as _signOut,
} from "firebase/auth";

import { toast } from "sonner";
import axiosPublic from "@/hooks/useAxios";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          const userInfo = await axiosPublic.get(
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
  }, [setUser, setLoading]);

  const googleProvider = new GoogleAuthProvider();
  const popUpSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const signOut = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      toast.promise(_signOut(auth), {
        loading: "Loading, Please wait ...",
        success: () => {
          resolve(true);
          return "Logout successfull!";
        },
        error: (err) => {
          reject(false);
          toast.error("Failed To Logout");
          return err.message;
        },
      });
    });
  };

  const popUp = (media) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      toast.promise(popUpSignIn(media), {
        loading: "Loading, Please wait ...",
        success: (res) => {
          if (res.user?.email) {
            const data = {
              displayName: res.user?.displayName || "",
              email: res.user.email,
              photoURL: res.user?.photoURL || "",
            };
            axiosPublic
              .post("/users", data)
              .then((res) => {
                setUser(res.data);
                resolve(res.data);
                toast.success(`Welcome ${res.data.displayName} !`);
              })
              .catch((err) => {
                toast.error("Something went wrong");
                toast.error(err.message);
              });
          }
          return "Login Successfull!";
        },
        error: (err) => {
          toast.error("Failed To Login");
          setLoading(false);
          return err.message;
        },
      });
    });
  };

  const googlePopUp = () => popUp(googleProvider);

  return (
    <AuthContext.Provider
      value={{
        googlePopUp,
        user,
        setUser,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
