import {
  ControlToolbarSkeleton,
  ZoomControlsSkeleton,
} from "@/sketch-detail/control-toolbar";
import { ShapeNavigationSkeleton } from "@/sketch-detail/control-toolbar/shape-navigation";
import { HandoffToolbarSkeleton } from "@/sketch-detail/handoff-toolbar";
import { TitleToolbarSkeleton } from "@/sketch-detail/title-toolbar";

// The skeleton only puts the skeletons of the toolbars on the paper. Each toolbar owns its skeleton, so a change of a toolbar is made next to it.
// The paper has no grid, because `cell_size` is not known before the sketch is fetched.
const SketchDetailSkeleton = () => {
  return (
    <div role="status" className="relative h-dvh overflow-hidden">
      <span className="sr-only">読み込み中…</span>
      <div aria-hidden>
        <div className="absolute inset-0 bg-canvas" />
        <TitleToolbarSkeleton />
        <ControlToolbarSkeleton>
          <ShapeNavigationSkeleton />
          <ZoomControlsSkeleton />
        </ControlToolbarSkeleton>
        <HandoffToolbarSkeleton />
      </div>
    </div>
  );
};

export { SketchDetailSkeleton };
