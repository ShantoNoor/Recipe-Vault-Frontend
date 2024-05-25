import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { toast } from "sonner";

const baseURL = import.meta.env.PROD ? "" : "http://localhost:3000";

const axiosPublic = axios.create({
  baseURL,
});

export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const axiosSecure = axios.create({
    baseURL,
  });

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("accessToken");
      config.headers.authorization = `Bearer ${token}`;
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
      if (status === 401 || status === 403) {
        try {
          const newTokens = await axiosPublic.post("/refresh-token", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { accessToken, refreshToken } = newTokens.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          originalRequest._retry = true;
          return await axiosSecure(originalRequest);
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
