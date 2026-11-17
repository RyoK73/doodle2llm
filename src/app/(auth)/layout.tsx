import { cn } from "cn";
import { navigationMenuInsetClassName } from "@/design-system/constants";
import { NavigationMenu } from "@/navigation-menu";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationMenu />
      {/* `flex-1` fills the body height so that the form's `my-auto` still centers it vertically. */}
      <div
        className={cn(
          navigationMenuInsetClassName,
          "flex flex-1 flex-col pr-6",
        )}
      >
        {children}
      </div>
    </>
  );
}
