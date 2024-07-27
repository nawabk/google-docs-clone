export const ENDPOINT = {
  BASE: "http://localhost:8000",
  AUTH: {
    SING_UP: "/api/users/signup",
    VERIFY: "/api/users/{userId}/verify",
    RESEND_TOKEN: "/api/users/{userId}/resend-token",
    SIGN_IN: "/api/users/signin",
    VALIDATE: "/api/users/validate",
    LOGOUT: "/api/users/logout",
    SEARCH: "/api/users/search",
  },
  DOCUMENT: {
    CREATE: "/api/documents/",
    GET: "/api/documents/{documentId}",
    UPDATE: "/api/documents/{documentId}",
    GET_ALL: "/api/documents",
  },
};

export const VERIFY_SIGNUP_MESSAGE =
  "Successfull Signup! Please verify your email";
