export const backendLocalUrl: string = "http://localhost:8080";
export const backendProductionUrl: string =
  "https://api-devtinder.onrender.com";

export const backendUrl: typeof backendLocalUrl = backendLocalUrl;

//auth routes
export const authRoute: string = `${backendUrl}/auth`;
export const loginRoute: string = `${authRoute}/login`;
export const loginIdentifyRoute: string = `${loginRoute}/identify/`;
export const loginVerifyRoute: string = `${loginRoute}/confirm/`;

// system routes
export const systemRoute: string = `${backendUrl}/system`;
export const systemHealthRoute: string = `${systemRoute}/health/`;
