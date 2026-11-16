import { notFound } from "next/navigation";
import { z } from "zod";
import { getSketchCached } from "@/sketch-detail/getSketchCached";
import { SketchEditor } from "@/sketch-detail/sketch-editor";
import { SketchError } from "@/sketch-detail/sketch-error";

const SketchDetail = async ({ id }: { id: string }) => {
  if (!z.uuid().safeParse(id).success) notFound();

  const result = await getSketchCached(id);

  if (!result.ok) {
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
