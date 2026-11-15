import { SkeletonBox } from "@/design-system/skeleton-box";

// The skeleton of `ZoomControls`. Keep the same order as the real one: zoom out, the input with `%`, and zoom in.
// The `%` is invisible, but it keeps the width of the real one.
const ZoomControlsSkeleton = () => {
  return (
    <>
      <SkeletonBox className="size-10" />
      <div className="flex items-center gap-1">
        <SkeletonBox className="h-10 w-16" />
        <span aria-hidden className="invisible select-none">
          %
        </span>
      </div>
      <SkeletonBox className="size-10" />
    </>
  );
};

export { ZoomControlsSkeleton };
