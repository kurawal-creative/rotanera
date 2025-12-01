"use client";

import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
