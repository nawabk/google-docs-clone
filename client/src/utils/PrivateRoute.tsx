import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { ENDPOINT } from "../constants";
import { useAuthContext } from "../context/auth-context";
import useFetch from "../hooks/useFetch";
import { SignInResponse } from "../types/auth";

type Props = {
  children: React.ReactNode;
};
const PrivateRoute = ({ children }: Props) => {
  const { state, dispatch } = useAuthContext();
  const { isUserValidated, isAuthenticated } = state;
  const { status, apiCall } = useFetch();

  useEffect(() => {
    async function validateUser() {
      const data = await apiCall<SignInResponse>({
        method: "GET",
        url: ENDPOINT.BASE + ENDPOINT.AUTH.VALIDATE,
      });
      if (data) {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
        dispatch({
          type: "SET_IS_AUTHENTICATED",
          payload: true,
        });
        dispatch({
          type: "SET_IS_USER_VALIDATED",
          payload: true,
        });
      }
    }
    if (!isUserValidated) {
      validateUser();
    }
  }, [isAuthenticated, isUserValidated, dispatch, apiCall]);

  if (isUserValidated) {
    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
  } else {
    if (status === "idle") return <></>;
    return status === "loading" ? (
      <Loader />
    ) : status === "success" ? (
      children
    ) : (
      <Navigate to="/signin" />
    );
  }
};

export default PrivateRoute;
