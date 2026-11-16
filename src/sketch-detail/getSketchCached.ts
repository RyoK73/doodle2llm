import { cache } from "react";
import { getSketch } from "@/supabase/sketch-crud/getSketch";
import { createSupabaseServerClient } from "@/supabase/utils/serverClient";

// `generateMetadata` and `SketchDetail` both need the sketch in the same request.
// `cache` shares the result between them, but it compares the arguments by reference.
// So the argument is only the id (a string), and the client is created inside.
const getSketchCached = cache(async (id: string) => {
  const supabaseClient = await createSupabaseServerClient();
  return getSketch(supabaseClient, id);
});

export { getSketchCached };
