"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function ClientHeader() {
  const pathname = usePathname();

  const hiddenRoutes = ["/upload", "/preview", "/report"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Header />;
}
