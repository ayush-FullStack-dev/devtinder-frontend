"use client";

import { useLoginStore } from "@/store/login.store";

export default function loginDataInitializer() {
  useLoginStore();

  return null;
}
