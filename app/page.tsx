"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    Router.push("/notification");
  })
  return (
    <>
    </>
  );
}
