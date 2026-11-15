import type { Side } from "@base-ui/react/internals/useAnchorPositioning";

// The toolbar is on the right edge, so the tooltip opens on the left.
const TOOLTIP_SIDE: Side = "left";

// The position is shared with `SketchDetailSkeleton`, so that the skeleton and the real toolbar keep the same place.
const handoffToolbarPositionClassName =
  "absolute top-1/2 right-4 z-10 -translate-y-1/2";

export { TOOLTIP_SIDE, handoffToolbarPositionClassName };
