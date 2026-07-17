"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiUrl, routes } from "@/constants/api";
import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";
import CustomError from "@/helpers/Error"

type RefreshComponentProps = {
  setIsRefreshing?: (isRefreshing: boolean) => void;
}

export default function RefreshComponent({ setIsRefreshing = () => { } }: RefreshComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch(apiUrl(routes.refresh), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId: getDeviceId(localStorage),
            deviceSize: getDeviceSize(localStorage),
            code: searchParams.get("approvalId"),
            clientTimestamp: new Date(),
          }),
        });

        const data = await response.json();

        if (!response.ok) throw new CustomError("Authentication Error", data.message)

        switch (data.action) {
          case "token_refreshed":
            router.replace(searchParams.get("redirect") || "/dashboard");
            break;

          case "stepup":
            router.replace("/auth/2fa");
            break;

          case "await_approval":
            router.replace(
              `/auth/session-approval?approvalId=${data.approvalId}`,
            );
            break;

          case "logout":
          case "logout-all":
            router.replace(
              `/login?message=${encodeURIComponent(data.message)}`,
            );
            break;

          default:
            router.replace("/login");
        }
      } catch (e) {
        router.replace(`/error?title=${encodeURIComponent(e instanceof Error ? e.name : "Something went wrong")}&message=${encodeURIComponent(e instanceof Error ? e.message : "Unknown error")}&redirect=${encodeURIComponent(searchParams.get("redirect") || "/dashboard")}`)
      } finally {
        setIsRefreshing(false);
      }
    };

    refresh();
  }, [router, searchParams]);

  return null;
}
