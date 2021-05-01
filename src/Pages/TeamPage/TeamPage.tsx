import { NavBar2 } from "../../components/Navbar/NavBar";
import { Container, Form } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import gil from "./gil.jpeg";
import yon from "./yonatan.jpeg";
import alon from "./alon.jpeg";
import yanir from "./yanir.jpeg";
import daniel from "./daniell.jpeg";
import adarsh from "./adarsh.png";
import vijay from "./vijay.jpg";
import charis from "./charis.jpeg";

import { FaLinkedin, FaTwitter } from "react-icons/fa";

export type ITeamCardProps = {
  name: string;
  designation: string;
  twitterlink?: string;
  linkedLink?: string;
  image: string;
};

const TeamCard = ({
  name,
  designation,
  image,
  twitterlink,
  linkedLink,
}: ITeamCardProps) => {
  return (
    <div className="col-md-3 mb-5">
      <div
        className="shadow-sm py-5 p-3 d-flex flex-column justify-content-between align-items-center h-100"
        style={{ background: "#fff", borderRadius: 4 }}
      >
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: 100,
            height: 100,
          }}
        >
          <img className="team-image img-fluid" src={image} />
        </div>
        <h3 className="mt-4 text-center">{name}</h3>
        <p>{designation}</p>

        {twitterlink && (
          <a href={twitterlink}>
            <FaTwitter />
          </a>
        )}
        {linkedLink && (
          <a href={linkedLink}>
            <FaLinkedin />
          </a>
        )}
      </div>
    </div>
  );
};

const TeamJSON: ITeamCardProps[] = [
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
  {
    image: charis,
    name: "Charis Rafailids",
    designation: "Team Manager",
  },
  {
    image: adarsh,
    name: "Adarshdeep Singh",
    designation: "Developer",
  },
  {
    image: vijay,
    name: "Vijay Bhayani",
    designation: "Developer",
  },
];

const TeamPage = () => {
  return (
    <div className="bgnav">
      <NavBar2 hideWallet />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row ">
            <div className="col">
              <h1 className="text-center mt-md-3">Our Team</h1>
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            {TeamJSON.map((team) => {
              return <TeamCard key={team.name} {...team} />;
            })}
          </div>
          <p className="text-center" style={{ fontSize: 20 }}>
            No pre-sales. Team member will never sell tokens directly. All token
            sales and launches will be announced through our official Telegram
            and Twitter account.
          </p>
        </Container>
      </div>
      {/*  footer */}
      <Footer />
    </div>
  );
};

export default TeamPage;
