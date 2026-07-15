export const backendUrl: string =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
    : "/api";

//auth routes
export const authRoute: string = `${backendUrl}/auth`;
export const accountInfoRoute: string = `${authRoute}/me/`;
export const loginRoute: string = `${authRoute}/login`;
export const loginIdentifyRoute: string = `${loginRoute}/identify/`;
export const loginVerifyRoute: string = `${loginRoute}/confirm/`;
export const refreshRoute: string = `${authRoute}/refresh`;

// system routes
export const systemRoute: string = `${backendUrl}/system`;
export const systemHealthRoute: string = `${systemRoute}/health/`;
