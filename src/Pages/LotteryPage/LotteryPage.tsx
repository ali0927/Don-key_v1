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
      <HeaderSection timerDate={"May 17, 2021 15:00:00 UTC"} />
      <CatchLuckSection />
      <HexagonSection />
      <DescriptionSection />
    </>
  );
};
