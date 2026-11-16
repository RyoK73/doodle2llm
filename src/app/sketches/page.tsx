import { Suspense } from "react";
import type { Metadata } from "next";
import { cn } from "cn";
import { navigationMenuInsetClassName } from "@/design-system/constants";
import { SketchList, SketchListSkeleton } from "@/sketch-list";

export const metadata: Metadata = { title: "スケッチ" };

const page = () => {
  return (
    <div
      className={cn(
        navigationMenuInsetClassName,
        "mx-auto flex w-full max-w-3xl flex-col gap-6 py-12 pr-6",
      )}
    >
      <h1 className="text-headline-md">スケッチ</h1>
      <Suspense fallback={<SketchListSkeleton />}>
        <SketchList />
      </Suspense>
    </div>
  );
};

export default page;
