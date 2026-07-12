"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { refreshRoute } from "@/constants/api";
import { useDeviceStore } from "@/store/useDevice.store";

export default function RefreshComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const deviceId = useDeviceStore((state) => state.deviceId);
  const deviceSize = useDeviceStore((state) => state.deviceSize);

  useEffect(() => {
    if (!deviceId || !deviceSize) {
      return;
    }

    const refresh = async () => {
      try {
        const response = await fetch(refreshRoute, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId,
            deviceSize,
            code: searchParams.get("approvalId"),
            clientTimestamp: new Date(),
          }),
        });

        const data = await response.json();

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
      } catch {
        router.replace("/login");
      }
    };

    refresh();
  }, [deviceId, deviceSize, router, searchParams]);

  return null;
}
