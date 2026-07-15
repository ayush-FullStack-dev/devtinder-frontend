import jakarta from "@/assets/fonts/font.jakarta";
import Link from "next/link";
import type { IconType } from "react-icons";

type props = {
  text: string;
  icon: IconType;
  href?: string;
  className?: string;
  onClick?: () => void;
};

const IconTextButton = ({
  text,
  icon: Icon,
  href,
  onClick,
  className: costumclassName,
}: props) => {
  const className = `box-border inline-flex justify-center gap-4 items-center  rounded-lg border-2 border-muted-foreground ${costumclassName}`;

  const iconText = () => {
    return (
      <>
        <Icon size="20" />
        <p className={`font-bold ${jakarta.className} text-mid`}>{text}</p>
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
