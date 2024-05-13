import { useState } from "react";
import { APIResponse, ErrorResponse } from "../types/common";

type PostAndPutProps<RequestBody> = {
  method: "POST" | "PUT";
  body: RequestBody;
};
type Props<RequestBody> =
  | {
      url: string;
      returnResponse?: boolean;
      setResponseDataState?: boolean;
    } & (
      | {
          method?: "GET" | "DELETE";
        }
      | PostAndPutProps<RequestBody>
    );

type Status = "idle" | "loading" | "success" | "error";

function isErrorMessage<T>(
  response: APIResponse<T>
): response is ErrorResponse {
  return (
    "message" in response && !response.statusCode.toString().startsWith("2")
  );
}

const useFetch = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [responseData, setResponseData] = useState<unknown>(null);
  const [error, setError] = useState<string>("");

  async function apiCall<ResponseBody, RequestBody = {}>(
    props: Props<RequestBody>
  ): Promise<APIResponse<ResponseBody> | undefined> {
    const { method, url } = props;
    let { setResponseDataState = true, returnResponse = false } = props;
    if (method === "POST" || method === "PUT") {
      setResponseDataState = false;
      returnResponse = true;
    }
    try {
      setStatus("loading");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...((props.method === "POST" || props.method === "PUT") && {
          body: JSON.stringify(props.body),
        }),
      });
      const responseData = (await response.json()) as APIResponse<ResponseBody>;
      if (response.ok) {
        setStatus("success");
        if (returnResponse) return responseData;
        if (setResponseDataState) setResponseData(responseData);
      } else {
        setStatus("error");
        if (isErrorMessage(responseData)) {
          setError(responseData.message);
        } else {
          setError("Something went wrong!");
        }
      }
    } catch (e) {
      setStatus("error");
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Someting went Wrong!");
      }
    }
  }

  return { status, responseData, error, apiCall };
};

export default useFetch;
