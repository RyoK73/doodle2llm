import { MyToolTip } from "@/design-system/tool-tip";
import Link from "next/link";
import { LuDoorOpen } from "react-icons/lu";
import { TOOLTIP_SIDE } from "@/navigation-menu/constants";

type TopPageLinkProps = {
  className?: string;
};

const TopPageLink = ({ className }: TopPageLinkProps) => {
  return (
    <MyToolTip side={TOOLTIP_SIDE} message="トップページへ">
      <Link href={"/"} aria-label="トップページへ" className={className}>
        <LuDoorOpen />
      </Link>
    </MyToolTip>
  );
};

export { TopPageLink };
