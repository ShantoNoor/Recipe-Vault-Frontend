import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { toast } from "sonner";

const baseURL = import.meta.env.PROD
  ? "https://recipe-vaultt-backend.vercel.app"
  : "http://localhost:3000";

const axiosPublic = axios.create({
  baseURL,
});

export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const axiosSecure = axios.create({
    baseURL,
  });

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("accessToken");
      config.headers.authorization = `Bearer ${token}`;

      if (
        config.method === "post" ||
        config.method === "put" ||
        config.method === "patch"
      ) {
        if (config.data) {
          config.data.email = user?.email;
        } else {
          config.data = { email: user?.email };
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const status = error.response.status;
      if ((status === 401 || status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newTokens = await axiosPublic.post("/refresh-token", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            newTokens.data;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return axiosSecure(originalRequest);
        } catch (err) {
          await signOut();
          navigate("/");
          toast.info("Action requires login using google account!");
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default axiosPublic;
