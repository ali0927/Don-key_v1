
import * as React from "react";
import { BdollarIcon, DarkHasdaIcon, FinanceIcon, HasdaIcon, UniIcon } from "../../../icons";
import styled from "styled-components";

const Section = styled.div({
    display: "flex",
    justifyContent: "center",
    height: 424,
    background: "#F4E41C",
    marginTop: "10%",
    padding: "7rem",
});

const DivBox = styled.div({});

const IconsBox = styled.div({
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
});

const ContentBox = styled.div({
    width: "60%",
});

const Content = styled.p({
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: 800,
    lineHeight: "40px",
    textAlign: "center",
    color: "#070602",
    maxWidth: 365,
});

const ContentCentred = styled.div({
    display: "flex",
    justifyContent: "center",
});

const GrayButton = styled.button({
    background: "#222222",
    boxShadow: "0px 6px 12px -6px rgba(24, 39, 75, 0.12)",
    borderRadius: "5px",
    width: 208,
    height: 50,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#fff",
    /* identical to box height */
    textAlign: "center",
})

export const GoToBuilderSection: React.FC = () => {
    return (
        <>
            <Section>
                <IconsBox>
                    <DivBox>
                        <BdollarIcon />
                    </DivBox>

                    <DivBox>
                        <DivBox className="mb-4"><FinanceIcon /></DivBox>
                        <DivBox className="mb-4"><HasdaIcon /></DivBox>
                        <DivBox><DarkHasdaIcon /></DivBox>
                    </DivBox>
                </IconsBox>

                <ContentBox>
                    <ContentCentred>
                        <Content>Go to builder and start building strategies</Content>
                    </ContentCentred>

                    <ContentCentred>
                        <GrayButton className="mt-5">Building strategies</GrayButton>
                    </ContentCentred>
                </ContentBox>

                <IconsBox>
                  

                    <DivBox>
                        <DivBox className="mb-4"><FinanceIcon /></DivBox>
                        <DivBox className="mb-4"><HasdaIcon /></DivBox>
                        <DivBox><DarkHasdaIcon /></DivBox>
                    </DivBox>
                    <DivBox>
                        <UniIcon />
                    </DivBox>
                </IconsBox>
            </Section>
        </>
    )
}