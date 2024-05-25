import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorLogo from "../../assets/error.svg";
import SuccessLogo from "../../assets/success.svg";
import { ENDPOINT } from "../../constants";
import useFetch from "../../hooks/useFetch";
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
  }, [userId, token]);

  return (
    <div className="mt-48 col-span-full">
      {status === "loading" && <Loader />}
      <div className="flex flex-col items-center gap-4">
        <div className="w-10">{!!error ? <ErrorLogo /> : <SuccessLogo />}</div>
        <p className="font-bold">
          {!!error
            ? "Email verification failed!"
            : "Email verificaiton successfull!"}
        </p>
        <p className="text-lg">{!!error ? error : ""}</p>
        {!!error && (
          <div className="mt-2">
            <ResendToken userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="mt-10 rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      <p className="text-xl flex justify-center items-center">Loading...</p>
    </div>
  );
};

export default VerifyEmail;
