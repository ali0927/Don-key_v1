import { Footer } from "components/Footer/Footer";
import { NavBar } from "components/Navbar/NavBar";
import styled from "styled-components";
import {theme} from "theme";

const Root = styled.div`
    background: ${theme.palette.background.yellow};
`;

export const Layout = ({
  children,
  variant,
  className = "",
  style={},
}: {
  children: React.ReactNode;
  variant?: "landing" | "loggedin" ;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Root  className={className} style={style}>
      <NavBar variant={variant} />
      {children}
      <Footer />
    </Root>
  );
};
