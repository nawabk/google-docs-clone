import { useState } from "react";
import {
  APIResponse,
  ErrorResponse,
  SuccessfullResponse,
} from "../types/common";

type PostAndPutProps<RequestBody> = {
  method: "POST" | "PATCH";
  body: RequestBody;
};
type Props<RequestBody> =
  | {
      url: string;
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
  return "message" in response && response.status === "error";
}

function isSuccessfullResponse<T>(
  response: APIResponse<T>
): response is SuccessfullResponse<T> {
  return "data" in response && response.status === "success";
}

const useFetch = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function apiCall<ResponseBody, RequestBody = {}>(
    props: Props<RequestBody>
  ): Promise<SuccessfullResponse<ResponseBody>["data"] | undefined> {
    const { method, url } = props;
    try {
      setStatus("loading");
      setError("");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...((props.method === "POST" || props.method === "PATCH") && {
          body: JSON.stringify(props.body),
        }),
      });
      const responseData = (await response.json()) as APIResponse<ResponseBody>;
      if (response.ok) {
        setStatus("success");
        if (isSuccessfullResponse(responseData)) {
          return responseData.data;
        }
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

  return { status, error, apiCall };
};

export default useFetch;
