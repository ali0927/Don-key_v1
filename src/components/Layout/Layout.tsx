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
}: {
  children: React.ReactNode;
  variant?: "landing" | "loggedin" ;
  className?: string;
}) => {
  return (
    <Root className={className}>
      <NavBar variant={variant} />
      {children}
      <Footer />
    </Root>
  );
};
