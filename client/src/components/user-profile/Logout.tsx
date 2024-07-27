import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import useFetch from "../../hooks/useFetch";

const Logout = () => {
  const { apiCall } = useFetch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    apiCall({
      url: ENDPOINT.BASE + ENDPOINT.AUTH.LOGOUT,
    });
    // window.history.pushState({},"",)
    navigate("/signin");
  };

  return (
    <div
      className="flex gap-2 items-center hover:text-blue-600 cursor-pointer"
      onClick={logoutHandler}
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
      <span>Logout</span>
    </div>
  );
};

export default Logout;
