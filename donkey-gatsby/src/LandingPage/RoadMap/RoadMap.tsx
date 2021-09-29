import { useMediaQuery } from '@material-ui/core';
import { StaticImage } from 'gatsby-plugin-image'
import React from "react";
import { theme } from 'theme';
export const RoadMap = () => {
  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);
  if(isDesktop){
    return <StaticImage src="./images/banner.png" quality={100} alt="roadmap" />
  }
  return <StaticImage src="./images/mobile-banner.png" quality={100} alt="roadmap" />
 
}