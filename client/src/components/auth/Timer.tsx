import { useEffect, useState } from "react";
import { formatTimer } from "../../utils";
import ResendToken from "./ResendToken";

const Timer = ({ userId }: { userId: string }) => {
  const [minutes, setMinutes] = useState<string>("01");
  const [seconds, setSeconds] = useState<string>("00");
  const [showResendToken, setShowResendToken] = useState<boolean>(false);

  useEffect(() => {
    function verificationHandler() {}
    const endTime = Date.now() + 60 * 1000;
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const diff = endTime - currentTime;
      const seconds = Math.round(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      setSeconds(formatTimer(seconds));
      setMinutes(formatTimer(minutes));
      if (diff <= 0) {
        verificationHandler();
        clearInterval(interval);
        setShowResendToken(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <p className="text-blue-500 text-md font-bold justify-center flex">
        {minutes}:{seconds}
      </p>
      {showResendToken && (
        <div className="flex justify-center">
          <ResendToken userId={userId} />
        </div>
      )}
    </>
  );
};

export default Timer;
