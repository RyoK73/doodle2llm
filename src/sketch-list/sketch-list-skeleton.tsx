import { SkeletonBar } from "@/design-system/skeleton-bar";
import {
  sketchListClassName,
  sketchListItemClassName,
} from "@/sketch-list/constants";

const SKELETON_ITEM_COUNT = 3;

// The skeleton has no text, so each row is a bar that is as tall as the line of the real text (the line height of the `text-*` class).
const SketchListSkeleton = () => {
  return (
    <div role="status">
      <span className="sr-only">読み込み中…</span>
      <ul aria-hidden className={sketchListClassName}>
        {Array.from({ length: SKELETON_ITEM_COUNT }, (_, index) => (
          <li key={index} className={sketchListItemClassName}>
            <span className="text-label-md">
              <SkeletonBar className="w-1/3" />
            </span>
            <span className="text-body-md">
              <SkeletonBar className="w-2/3" />
            </span>
            <span className="text-body-md">
              <SkeletonBar className="w-1/4" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SketchListSkeleton };
