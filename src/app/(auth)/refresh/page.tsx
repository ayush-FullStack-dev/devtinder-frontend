"use client";

import { Suspense } from "react";
import RefreshComponent from "@/app/(auth)/refresh/_components/RefreshComponent";

export default function RefreshPage() {
  
  return (
    <Suspense fallback={null}>
      <RefreshComponent />
    </Suspense>
  );
}
