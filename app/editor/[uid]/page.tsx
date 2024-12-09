"use client";
import FormGeneratorRoot from "@/components/FormGeneratorRoot";
import { useParams } from "next/navigation";

const Page = () => {
  const { uid } = useParams();
  const normalizedUid = typeof uid === "string" ? uid : undefined;
  if (!normalizedUid) return <h1>Not found</h1>;

  return (
    <section className="">
      <FormGeneratorRoot uid={normalizedUid} />
    </section>
  );
};

export default Page;
