import { eloquia } from "@/assets/fonts/font.eloquia";
import { googleSansFlex } from "@/assets/fonts/font.google";

type ErrorContentProps = {
  name: string;
  message: string;
  className?: string
  description?: string;
};

const ErrorContent = ({ className = "", name, message, description }: ErrorContentProps) => {
  return (
    <div className={`flex flex-col items-center gap-2  ${className}`}>
      <h1 className={`${googleSansFlex.className}  text-2xl font-bold`}>
        {name}
      </h1>
      <span className={`text-[#9a999a] flex flex-col items-center ${googleSansFlex.className} font-lighter`}>
        <p className={`${eloquia.className}`}>{message}</p>
        <p className={`${eloquia.className} `}>{description}</p>
      </span>
    </div>
  );
};

export default ErrorContent;
