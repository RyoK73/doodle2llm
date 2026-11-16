import { NavigationMenu } from "@/navigation-menu";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationMenu />
      {children}
    </>
  );
}
