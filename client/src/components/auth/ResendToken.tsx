import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ENDPOINT } from "../../constants";
import useFetch from "../../hooks/useFetch";

const ResendToken = ({ userId }: { userId: string }) => {
  const {
    status: resendToeknStatus,
    error: resendTokenError,
    apiCall: resendTokenAPICall,
  } = useFetch();

  const resendToken = async () => {
    try {
      const url =
        ENDPOINT.BASE + ENDPOINT.AUTH.RESEND_TOKEN.replace("{userId}", userId);
      await resendTokenAPICall({
        method: "POST",
        url,
        body: {},
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p
        className="text-blue-600 hover:underline cursor-pointer"
        onClick={resendToken}
      >
        Resend Token
      </p>
      {resendToeknStatus === "loading" && (
        <p>
          Sending verificaiton token{" "}
          <FontAwesomeIcon icon={faCircleNotch} spin className="ml-2" />
        </p>
      )}
      {resendToeknStatus === "success" ? (
        <p className="text-green-600">
          Resend token has been sent successfully!
        </p>
      ) : (
        <p className="text-red-600">{resendTokenError}</p>
      )}
    </div>
  );
};

export default ResendToken;
