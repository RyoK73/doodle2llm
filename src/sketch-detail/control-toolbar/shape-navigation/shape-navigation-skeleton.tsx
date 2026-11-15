import { SkeletonBox } from "@/design-system/skeleton-box";

// The skeleton of `ShapeNavigation`. Keep one box for each button of the real one: the shapes (`shapeItems`), undo, redo, and delete.
const BUTTON_COUNT = 5;

const ShapeNavigationSkeleton = () => {
  return (
    <div>
      {Array.from({ length: BUTTON_COUNT }, (_, index) => (
        <SkeletonBox key={index} className="inline-flex size-10" />
      ))}
    </div>
  );
};

export { ShapeNavigationSkeleton };
