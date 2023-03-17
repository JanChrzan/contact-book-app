import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = Cookies.get("token");
  return token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
