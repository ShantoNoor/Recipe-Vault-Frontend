import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Spinner from "./Spinner";
import { toast } from "sonner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname, state } = useLocation();

  if (loading) return <Spinner />;
  if (user) return children;
  toast.info("Action requires login using google account!")
  return <Navigate to="/" state={{ ...state, pathname }} replace={true} />;
};

export default PrivateRoute;
