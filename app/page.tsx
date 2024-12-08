"use client";

import { useEffect, useState } from "react";
import FormGeneratorRoot from "@/components/FormGeneratorRoot";
import { FormDataProps } from "@/types/FormTypes";
import Link from "next/link";
import Image from "next/image";
import FormList from "@/components/FormList";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <aside className="h-screen p-4 flex-[1] max-w-[300px] pannel">
        <Image src="/images/LOGO.png" alt="Logo" width={30} height={30} />
      </aside>
      <section className="h-screen flex-[2] border border-gray-400/30 overflow-y-scroll">
        <FormGeneratorRoot />
      </section>
      <aside className="h-screen p-4 flex-[1] max-w-[300px] overflow-y-scroll pannel">
        <FormList />
      </aside>
    </main>
  );
}
