import { StaticImage } from "gatsby-plugin-image";
import { IStaticImageProps } from "gatsby-plugin-image/dist/src/components/static-image.server";
import * as React from "react";
import { Omit } from "react-redux";

export const ShareandEarnButton = (
  props: Omit<IStaticImageProps, "src" | "alt">
) => {
  return (
    <StaticImage
      width={400}
      className={props.className}
      quality={100}
      formats={["png"]}
      onClick={props.onClick}
      placeholder="none"
      alt="ShareAndEarn"
      src="../images/shareandearn.png"
    />
  );
};


