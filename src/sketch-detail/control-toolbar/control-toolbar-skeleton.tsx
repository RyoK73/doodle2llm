import type { ReactNode } from "react";
import { cn } from "cn";
import { iconItemListClassName } from "@/design-system/constants";
import { controlToolbarPositionClassName } from "@/sketch-detail/control-toolbar/constants";

// The skeleton of `ControlToolbar`. It has the same frame and holds the skeletons of the controls, as the real one holds the controls.
const ControlToolbarSkeleton = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        iconItemListClassName,
        controlToolbarPositionClassName,
        "items-center",
      )}
    >
      {children}
    </div>
  );
};

export { ControlToolbarSkeleton };
