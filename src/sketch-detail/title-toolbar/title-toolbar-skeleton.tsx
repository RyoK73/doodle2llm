import { cn } from "cn";
import { floatingToolbarClassName } from "@/design-system/constants";
import { SkeletonBar } from "@/design-system/skeleton-bar";
import { titleToolbarPositionClassName } from "@/sketch-detail/title-toolbar/constants";

// The skeleton of `TitleToolbar`. Keep the rows in line with the real one: the title, the description, the size, and the updated time.
// The skeleton has no text, so each row is a bar that is as tall as the line of the real text.
const TitleToolbarSkeleton = () => {
  return (
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
  );
};

export { TitleToolbarSkeleton };
