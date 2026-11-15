import type { Side } from "@base-ui/react/internals/useAnchorPositioning";

const TOOLTIP_SIDE: Side = "top";

// The position is shared with `SketchDetailSkeleton`, so that the skeleton and the real toolbar keep the same place.
const controlToolbarPositionClassName =
  "absolute bottom-4 left-1/2 z-10 -translate-x-1/2";

export { TOOLTIP_SIDE, controlToolbarPositionClassName };
