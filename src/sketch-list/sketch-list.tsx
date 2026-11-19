import Link from "next/link";
import { cn } from "cn";
import {
  sketchListClassName,
  sketchListItemClassName,
} from "@/sketch-list/constants";
import { createSupabaseServerClient } from "@/supabase/utils/serverClient";
import { getSketchList } from "@/supabase/sketch-crud/getSketchList";
import { LocalTime } from "@/design-system/local-time";
import { logError } from "@/error-logging";

const SketchList = async () => {
  const supabaseClient = await createSupabaseServerClient();
  const result = await getSketchList(supabaseClient);

  if (!result.ok) {
    logError(result.error, { feature: "fetch-sketch-list" });
    return <p role="alert">スケッチ一覧の取得に失敗しました</p>;
  }

  if (result.value.length === 0) {
    return <p>スケッチがまだありません</p>;
  }

  return (
    <ul className={sketchListClassName}>
      {result.value.map((sketch) => (
        <li key={sketch.id}>
          <Link
            href={`/sketches/${sketch.id}`}
            className={cn(
              sketchListItemClassName,
              "transition-colors hover:bg-accent",
            )}
          >
            <span className="text-label-md">{sketch.title}</span>
            {sketch.description && (
              <span className="text-muted-foreground">
                {sketch.description}
              </span>
            )}
            <LocalTime updatedAt={sketch.updated_at} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { SketchList };
