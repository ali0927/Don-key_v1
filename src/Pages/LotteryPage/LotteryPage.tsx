import React from "react";
import { HeaderSection } from "./components";
import styled from "styled-components";
import { CatchLuckSection } from "./components/CatchLuckSection";
import { Container } from "react-bootstrap";
import { HexagonSection } from "./components/HexagonSection/HexagonSection";
import { DescriptionSection } from "./components/DescriptionSection";
import { Footer } from "components/Footer";

export const LotteryPage: React.FC = () => {
  return (
    <>
        <HeaderSection timerDate={"May 15, 2021 15:37:25"} />
        <CatchLuckSection />
        <HexagonSection/>
        <DescriptionSection/>
    </>
  );
};
