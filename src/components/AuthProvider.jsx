import { createContext, useState } from "react";
import app from "@/lib/firebase.config.js";
import {
  GoogleAuthProvider,
  getAuth,
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
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return "Logout successful!";
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
    return new Promise((resolve) => {
      toast.promise(popUpSignIn(media), {
        loading: "Loading, Please wait ...",
        success: (res) => {
          if (res.user?.email) {
            const data = {
              displayName: res.user?.displayName || "",
              email: res.user?.email,
              photoURL: res.user?.photoURL || "",
            };
            axiosPublic
              .post("/users", data)
              .then((res) => {
                axiosPublic
                  .post(`/jwt`, {
                    email: data?.email,
                  })
                  .then((result) => {
                    setUser(res.data);
                    resolve(res.data);
                    toast.success(`Welcome ${res.data.displayName} !`);

                    const { accessToken, refreshToken } = result.data;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                  })
                  .catch((err) => {
                    toast.error("Unable to get access token");
                    toast.error(err.message);
                  });
              })
              .catch((err) => {
                toast.error("Something went wrong");
                toast.error(err.message);
              });
          }
          return "Login Successful!";
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
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
