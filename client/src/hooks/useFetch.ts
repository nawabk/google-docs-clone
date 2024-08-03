import { useCallback, useState } from "react";
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
      returnFullResponse?: boolean;
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

function isSuccessfullResponse<T, IsPaginatedResponse extends boolean = false>(
  response: APIResponse<T>
): response is SuccessfullResponse<T, IsPaginatedResponse> {
  return "data" in response && response.status === "success";
}

const useFetch = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const apiCall = useCallback(
    async <
      ResponseBody,
      RequestBody = void,
      IsPaginatedResponse extends boolean = false
    >(
      props: Props<RequestBody>
    ): Promise<
      SuccessfullResponse<ResponseBody, IsPaginatedResponse> | undefined
    > => {
      const { method, url } = props;
      try {
        setStatus("loading");
        setError("");
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          ...((props.method === "POST" || props.method === "PATCH") && {
            body: JSON.stringify(props.body),
          }),
        });
        const responseData =
          (await response.json()) as APIResponse<ResponseBody>;
        if (response.ok) {
          if (
            isSuccessfullResponse<ResponseBody, IsPaginatedResponse>(
              responseData
            )
          ) {
            setStatus("success");
            return responseData;
          } else {
            setStatus("error");
            setError("Not a successful response!");
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
    },
    []
  );

  // async function apiCall<
  //   ResponseBody,
  //   RequestBody = void,
  //   IsPaginatedResponse extends boolean = false
  // >(
  //   props: Props<RequestBody>
  // ): Promise<
  //   SuccessfullResponse<ResponseBody, IsPaginatedResponse> | undefined
  // > {
  //   const { method, url } = props;
  //   try {
  //     setStatus("loading");
  //     setError("");
  //     const response = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       ...((props.method === "POST" || props.method === "PATCH") && {
  //         body: JSON.stringify(props.body),
  //       }),
  //     });
  //     const responseData = (await response.json()) as APIResponse<ResponseBody>;
  //     if (response.ok) {
  //       if (
  //         isSuccessfullResponse<ResponseBody, IsPaginatedResponse>(responseData)
  //       ) {
  //         setStatus("success");
  //         return responseData;
  //       } else {
  //         setStatus("error");
  //         setError("Not a successful response!");
  //       }
  //     } else {
  //       setStatus("error");
  //       if (isErrorMessage(responseData)) {
  //         setError(responseData.message);
  //       } else {
  //         setError("Something went wrong!");
  //       }
  //     }
  //   } catch (e) {
  //     setStatus("error");
  //     if (e instanceof Error) {
  //       setError(e.message);
  //     } else {
  //       setError("Someting went Wrong!");
  //     }
  //   }
  // }

  return { status, error, apiCall };
};

export default useFetch;
