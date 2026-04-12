declare module "*.scss" {
  interface IClassNames {
    [className: string]: string
  }
  const classnames: IClassNames
  export = classnames
}

/* declare module "*.svg"{
    let content: any;
    export default content;
} */

declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"{
    import React from "react";
    let SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
