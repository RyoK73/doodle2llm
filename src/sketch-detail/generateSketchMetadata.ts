import type { Metadata } from "next";
import { getSketchCached } from "@/sketch-detail/getSketchCached";

// A missing title is a small problem, so a failure of `getSketch` does not throw.
// It returns no title, and the default title is used.
// `SketchDetail` is in charge of showing the error or the 404 page.
// An invalid public env still throws (`parsePublicEnv`), but `SketchDetail` fails in the same way.
const generateSketchMetadata = async (id: string): Promise<Metadata> => {
  const result = await getSketchCached(id);
  if (!result.ok || !result.value) return {};

  const { title } = result.value;
  if (title.trim() === "") return {};

  return { title };
};

export { generateSketchMetadata };
