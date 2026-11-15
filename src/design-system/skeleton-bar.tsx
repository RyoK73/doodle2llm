import * as React from "react";
import { cn } from "cn";

// A bar of a skeleton. Its height is one line (`1lh`) of the parent, so put it in an element that has the `text-*` class of the text it stands for.
function SkeletonBar({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="skeleton-bar"
      className={cn(
        "block h-1lh animate-pulse rounded-sm bg-muted motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export { SkeletonBar };
