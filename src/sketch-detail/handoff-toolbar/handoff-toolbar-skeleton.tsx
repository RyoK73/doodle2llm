import { cn } from "cn";
import { iconItemListClassName } from "@/design-system/constants";
import { SkeletonBox } from "@/design-system/skeleton-box";
import { handoffToolbarPositionClassName } from "@/sketch-detail/handoff-toolbar/constants";

// The skeleton of `HandoffToolbar`. Keep one box for each button of the real one: copy and download.
const HandoffToolbarSkeleton = () => {
  return (
    <div
      className={cn(
        iconItemListClassName,
        handoffToolbarPositionClassName,
        "flex-col",
      )}
    >
      <SkeletonBox className="size-10" />
      <SkeletonBox className="size-10" />
    </div>
  );
};

export { HandoffToolbarSkeleton };
