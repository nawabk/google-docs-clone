import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorLogo from "../../assets/error.svg";
import SuccessLogo from "../../assets/success.svg";
import { ENDPOINT } from "../../constants";
import useFetch from "../../hooks/useFetch";
import Loader from "../common/Loader";
import ResendToken from "./ResendToken";

const VerifyEmail = () => {
  const { status, error, apiCall } = useFetch();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") ?? "";
  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    async function verifyEmail() {
      const url =
        ENDPOINT.BASE + ENDPOINT.AUTH.VERIFY.replace("{userId}", userId);
      const data = await apiCall({
        url,
        method: "PATCH",
        body: {
          token,
        },
      });
      console.log(data);
    }
    verifyEmail();
  }, [userId, token, apiCall]);

  return (
    <div className="mt-48 col-span-full">
      {status === "loading" && <Loader />}
      <div className="flex flex-col items-center gap-4">
        <div className="w-10">{error ? <ErrorLogo /> : <SuccessLogo />}</div>
        <p className="font-bold">
          {error
            ? "Email verification failed!"
            : "Email verificaiton successfull!"}
        </p>
        <p className="text-lg">{error ? error : ""}</p>
        {!!error && (
          <div className="mt-2">
            <ResendToken userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
