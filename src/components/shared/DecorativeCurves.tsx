import Image from "next/image";
import DecorativeCurve from "@/../public/images/DecorativeCurves.png";

type DecorativeCurvesProps = {
  className?: string;
  firstImgClassName?: string
  secondImgClassName?: string
};

export default function DecorativeCurves({
  className,
  firstImgClassName,
  secondImgClassName,
}: DecorativeCurvesProps) {
  return (
    <div className={`${className ?? ""}`}>
      <Image
        src={DecorativeCurve}
        alt=""
        aria-hidden="true"
        priority
        className={`absolute right-40 -top-5 -z-10 h-85 w-auto rotate-10 select-none pointer-events-none ${
          firstImgClassName ?? ""}`}
      />

      <Image
        src={DecorativeCurve}
        alt=""
        aria-hidden="true"
        priority
        className={`absolute -right-10 -top-4 -z-10 h-75 w-auto rotate-17 select-none pointer-events-none ${
          secondImgClassName ?? ""}`}
      />
    </div>
  );
}