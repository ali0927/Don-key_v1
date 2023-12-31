import { BugReport } from "components/BugReport";
import { Suggest } from "components/Suggest";
import { Footer } from "components/Footer";
import { NavBar } from "components/Navbar";
import { Pill, PillContainer } from "components/Pills";
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "theme";
import { NextArrowButton } from "components/NextArrowButton";

const Header = styled.div`
  background-color: ${theme.palette.background.yellow};
  position: relative;
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 266px;
    background-color: ${theme.palette.background.yellow};
    height: 300px;
    width: 100%;
    border-bottom-left-radius: 90% 25%;
    border-bottom-right-radius: 90% 25%;
    z-index: -1;
  }
`;

const Heading = styled.p`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  font-style: normal;
  color: #222222;
  ${theme.mediaQueries.lg.up} {
    font-size: 42px;
  }
`;

const SubHeading = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #222222;
  ${theme.mediaQueries.lg.up} {
    font-size: 16px;
  }
`;

const enum CommunityTabs {
  strategy,
  bugReport,
}

export const CommunityPage = () => {
  const [selectedTab, setSelectedTab] = useState(CommunityTabs.strategy);

  const handleNextClick = () => {
    if (selectedTab === CommunityTabs.strategy)
      setSelectedTab(CommunityTabs.bugReport);
  };

  return (
    <>
      <NavBar />
      <Header>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 py-5">
              <Heading>Community page</Heading>
              <SubHeading>
                Welcome to our community page where users can vote and suggest
                new strategies, report bugs and more features coming soon.
              </SubHeading>
            </div>
            <div className="col-12 pb-4">
              <NextArrowButton to="#" onClick={handleNextClick} />
              <PillContainer>
                <Pill
                  active={selectedTab === CommunityTabs.strategy}
                  onClick={() => setSelectedTab(CommunityTabs.strategy)}
                >
                  Suggest Strategy
                </Pill>
                <Pill
                  active={selectedTab === CommunityTabs.bugReport}
                  onClick={() => setSelectedTab(CommunityTabs.bugReport)}
                  style={{ margin: "0 auto" }}
                >
                  Bug Report
                </Pill>
              </PillContainer>
            </div>
          </div>
        </div>
      </Header>

      {selectedTab === CommunityTabs.strategy && <Suggest />}
      {selectedTab === CommunityTabs.bugReport && <BugReport />}

      <Footer />
    </>
  );
};
