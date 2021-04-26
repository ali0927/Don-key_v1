import { ITeamBoardProps } from "./TeamBoard/interfaces";
import gil from "./images/gil.jpeg";
import yon from "./images/yonatan.jpeg";
import alon from "./images/alon.jpeg";
import yanir from "./images/yanir.jpeg";
import daniel from "./images/daniell.jpeg";

export const TeamJSON: ITeamBoardProps[] = [
    {
      image: gil,
      name: "Gil Shpirman",
      designation: "Co-founder",
      twitterlink: "https://twitter.com/shpirman",
    },
    {
      image: yon,
      name: "Yonatan Martsiano",
      designation: "Co-founder & Developer",
      //linkedLink: "https://www.linkedin.com/in/yonatan-martsiano-6376a314a/",
    },
  
    {
      image: yanir,
      name: "Yanir Goldenberg",
      designation: "Co-founder",
      //linkedLink: "https://www.linkedin.com/in/yanir-goldenberg-61074887/",
    },
    {
      image: daniel,
      name: "Daniel Jaffe",
      designation: "Co-founder & Developer",
      //linkedLink: "https://www.linkedin.com/in/daniel-j-23016211",
    },
    {
      image: alon,
      name: "Alon Hershberg",
      designation: "Advisor",
      // linkedLink: "https://www.linkedin.com/in/alon-herschberg-38876a13a/",
    },
  ];
  