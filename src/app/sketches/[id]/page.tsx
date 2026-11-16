import type { Metadata } from "next";
import { SketchDetail, generateSketchMetadata } from "@/sketch-detail";

export const generateMetadata = async ({
  params,
}: PageProps<"/sketches/[id]">): Promise<Metadata> => {
  const { id } = await params;
  return generateSketchMetadata(id);
};

const page = async ({ params }: PageProps<"/sketches/[id]">) => {
  const { id } = await params;
  return <SketchDetail id={id} />;
};

export default page;
