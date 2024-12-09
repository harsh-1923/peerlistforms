"use client";
import FormGeneratorRoot from "@/components/FormGeneratorRoot";
import FormList from "@/components/FormList";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { uid } = useParams();
  const normalizedUid = typeof uid === "string" ? uid : undefined;
  if (!normalizedUid) return <h1>Not found</h1>;

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <aside className="h-screen p-4 flex-[1] max-w-[300px] pannel">
        <Image src="/images/LOGO.png" alt="Logo" width={30} height={30} />
      </aside>
      <section className="h-screen flex-[2] border border-gray-400/30 overflow-y-scroll">
        <FormGeneratorRoot uid={normalizedUid} />
      </section>
      <aside className="h-screen p-4 flex-[1] max-w-[300px] overflow-y-scroll pannel">
        <FormList />
      </aside>
    </div>
  );
};

export default Page;
