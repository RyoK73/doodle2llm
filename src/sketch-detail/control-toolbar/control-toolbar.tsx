import type { ReactNode } from "react";
import { cn } from "cn";
import { iconItemListClassName } from "@/design-system/constants";
import { controlToolbarPositionClassName } from "@/sketch-detail/control-toolbar/constants";

// The card that floats at the bottom of the canvas. It only holds the controls, such as the shape buttons and the zoom controls.
const ControlToolbar = ({ children }: { children: ReactNode }) => {
  return (
    <div
      role="toolbar"
      aria-label="操作"
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

export { ControlToolbar };
