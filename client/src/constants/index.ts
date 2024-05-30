export const ENDPOINT = {
  BASE: "http://localhost:8000",
  AUTH: {
    SING_UP: "/api/users/signup",
    VERIFY: "/api/users/{userId}/verify",
    RESEND_TOKEN: "/api/users/{userId}/resend-token",
    SIGN_IN: "/api/user/signin",
  },
};

export const VERIFY_SIGNUP_MESSAGE =
  "Successfull Signup! Please verify your email";
