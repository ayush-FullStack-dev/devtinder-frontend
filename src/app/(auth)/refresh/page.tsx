"use client";

import { Suspense, useState } from "react";
import RefreshComponent from "@/app/(auth)/refresh/_components/RefreshComponent";
import AppLoader from "@/components/shared/Loader/AppLoader";

export default function RefreshPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <Suspense fallback={<AppLoader loading={isRefreshing} />}>

      <RefreshComponent setIsRefreshing={setIsRefreshing} />
    </Suspense>
  );
}
