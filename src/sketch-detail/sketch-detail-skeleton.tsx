import { cn } from "cn";
import {
  floatingToolbarClassName,
  iconItemListClassName,
} from "@/design-system/constants";
import { SkeletonBar } from "@/design-system/skeleton-bar";
import { controlToolbarPositionClassName } from "@/sketch-detail/control-toolbar/constants";
import { handoffToolbarPositionClassName } from "@/sketch-detail/handoff-toolbar/constants";
import { titleToolbarPositionClassName } from "@/sketch-detail/title-toolbar/constants";

const boxClassName =
  "block animate-pulse rounded-xl bg-muted motion-reduce:animate-none";
const iconBoxClassName = cn(boxClassName, "size-10");

// The toolbars float over the canvas, so each one has the same position and frame as the real one.
// The skeleton has no text, so each row is a bar that is as tall as the line of the real text.
// The paper has no grid, because `cell_size` is not known before the sketch is fetched.
const SketchDetailSkeleton = () => {
  return (
    <div role="status" className="relative h-dvh overflow-hidden">
      <span className="sr-only">読み込み中…</span>
      <div aria-hidden>
        <div className="absolute inset-0 bg-canvas" />
        <div
          className={cn(
            floatingToolbarClassName,
            titleToolbarPositionClassName,
            "flex flex-col gap-1 px-4 py-3",
          )}
        >
          <span className="border-b-2 border-transparent text-label-md">
            <SkeletonBar className="w-1/2" />
          </span>
          <span className="border-b-2 border-transparent text-body-md">
            <SkeletonBar className="w-3/4" />
          </span>
          <span className="text-body-md">
            <SkeletonBar className="w-1/4" />
          </span>
          <span className="text-body-md">
            <SkeletonBar className="w-1/3" />
          </span>
        </div>
        <div
          className={cn(
            iconItemListClassName,
            controlToolbarPositionClassName,
            "items-center",
          )}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={iconBoxClassName} />
          ))}
          <span className={iconBoxClassName} />
          <span className={cn(boxClassName, "h-10 w-16")} />
          <span className={iconBoxClassName} />
        </div>
        <div
          className={cn(
            iconItemListClassName,
            handoffToolbarPositionClassName,
            "flex-col",
          )}
        >
          <span className={iconBoxClassName} />
          <span className={iconBoxClassName} />
        </div>
      </div>
    </div>
  );
};

export { SketchDetailSkeleton };
