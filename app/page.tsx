"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      router.replace("/administrator/clients"); // ✅ Already logged in
    } else {
      router.replace("/login"); // 🚪 Not logged in
    }
  }, [router]);

  return null; // No visible content while redirecting
}
