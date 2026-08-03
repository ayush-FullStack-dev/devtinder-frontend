import { googleSansFlex } from "@/assets/fonts/font.google";
import jakarta from "@/assets/fonts/font.jakarta";
import Link from "next/link";
import type { IconType } from "react-icons";

type props = {
  text: string;
  icon: IconType;
  href?: string;
  className?: string;
  iconSize?: number
  onClick?: () => void;
};

const IconTextButton = ({
  text,
  icon: Icon,
  href,
  onClick,
  iconSize = 20,
  className: costumclassName,
}: props) => {
  const className = `box-border flex justify-center gap-4 items-center  rounded-lg border-2 border-[#383737] bg-[#1a1a1a]  hover:border-primary/30 hover:bg-transparent  transition-all duration-300 ease-out ${costumclassName}`;

  const iconText = () => {
    return (
      <>
        <Icon size={iconSize} />
        <p className={`font-bold ${googleSansFlex.className}`}>{text}</p>
      </>
    );
  };

  if (href) {
    return (
      <Link className={className} href={href}>
        {iconText()}
      </Link>
    );
  }

  return <div onClick={onClick} className={className}>{iconText()}</div>;
};

export default IconTextButton;
