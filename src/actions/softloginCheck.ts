"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

export const softLoginCheck = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE);
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE);

    const loggedIn = Boolean(
        accessToken || refreshToken
    );

    return loggedIn;
};