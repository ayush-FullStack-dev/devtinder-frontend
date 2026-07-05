// svgr.d.ts
declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const Component: FC<SVGProps<SVGSVGElement>>;
  export default Component;
}
