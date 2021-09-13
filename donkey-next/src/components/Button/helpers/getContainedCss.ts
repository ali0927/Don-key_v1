import { theme } from "theme";
import { IContainedButton } from "../interfaces";

export const getContainedCSS = (data: IContainedButton) => {
  let fontSize = "16px";
  let width = "100%";
  let height = "fit-content";
  const defaultCss = {
    backgroundColor: "",
    color: "",
    border: "1px solid transparent",
  };

  const hoverCss = {
    backgroundColor: "",
    color: "",
    shadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
  };

  if (data.fontSize) {
    fontSize = data.fontSize;
  }

  if (data.width) {
    width = data.width;
  }

  if (data.height) {
    height = data.height;
  }

  if (data.color === "black") {
    defaultCss.backgroundColor = theme.palette.common.black;
    defaultCss.color = theme.palette.text.white;
    hoverCss.backgroundColor = theme.palette.common.black;
    hoverCss.color = theme.palette.text.white;
    hoverCss.shadow =
      "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1)";
  } else if (data.color === "yellow") {
    defaultCss.backgroundColor = theme.palette.common.yellow;
    defaultCss.color = theme.palette.text.black;
    hoverCss.backgroundColor = theme.palette.common.black;
    hoverCss.color = theme.palette.text.white;
  } else if (data.color === "gradient") {
    defaultCss.backgroundColor =
      "linear-gradient(0deg, #FFFFFF, #FFFFFF), #B4B4B4;";
    defaultCss.color = theme.palette.text.black;
    defaultCss.border = "1px solid " + theme.palette.common.black;
    hoverCss.backgroundColor =
      "linear-gradient(0deg, #FFFFFF, #FFFFFF), #B4B4B4;";
    hoverCss.color = theme.palette.text.black;
  } else {
    defaultCss.backgroundColor = theme.palette.common.lightYellow;
    defaultCss.color = theme.palette.text.black;
    hoverCss.backgroundColor = theme.palette.common.darkYellow;
    hoverCss.color = theme.palette.text.black;
  }

  return {
    default: `
          font-size: ${fontSize};
          width: ${width};
          height: ${height};
          background-color: ${defaultCss.backgroundColor};
          color: ${defaultCss.color};
          border: ${defaultCss.border};
      `,
    hover: `
        background-color: ${hoverCss.backgroundColor};
        color: ${hoverCss.color};
        box-shadow: ${hoverCss.shadow};
      `,
    
  };
};
