import { notFound } from "next/navigation";
import { logError } from "@/error-logging";
import { getSketchCached } from "@/sketch-detail/getSketchCached";
import { isSketchId } from "@/sketch-detail/isSketchId";
import { SketchEditor } from "@/sketch-detail/sketch-editor";
import { SketchError } from "@/sketch-detail/sketch-error";

const SketchDetail = async ({ id }: { id: string }) => {
  if (!isSketchId(id)) notFound();

  const result = await getSketchCached(id);

  if (!result.ok) {
    logError(result.error, { feature: "fetch-sketch" });
    return <SketchError message="スケッチの取得に失敗しました" />;
  }

  const sketch = result.value;
  if (!sketch) notFound();

  return (
    <div className="relative h-dvh overflow-hidden">
      <SketchEditor sketch={sketch} />
    </div>
  );
};

export { SketchDetail };
