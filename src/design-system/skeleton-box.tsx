import * as React from "react";
import { cn } from "cn";

// A box of a skeleton. Give it the size of the element it stands for, such as `size-10`, with `className`.
function SkeletonBox({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="skeleton-box"
      className={cn(
        "block animate-pulse rounded-xl bg-muted motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export { SkeletonBox };
