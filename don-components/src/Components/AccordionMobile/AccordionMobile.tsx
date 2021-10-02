import clsx from "clsx";
import styled from "styled-components";
import { AccodionDownArrow } from "../../icons";
import { breakPoints } from "../../breakponts";

const StyledAccordionItem = styled.div`
  padding: 5px;
  border: 0px !important;
  margin-bottom: 1px;

  :first-child {
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }
  :last-child {
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
  }
  .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  }
`;

const StyledCardHeader = styled.div`
  background: #fff !important;
  padding: 0.7rem 0 0.7rem 0.7rem !important;
  border: 0 !important;
  & div[aria-expanded="false"] {
    svg {
      transform: unset !important;
    }
  }
  & div[aria-expanded="true"] {
    svg {
      transform: rotate(180deg) !important;
    }
  }
`;

export const AccordionHeaderRow = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const AccordionBody = styled.div`
  padding-top: 0;
`;

type Props = {
  smFontSize?: string;
  mdFontSize?: string;
  color?: string;
}
export const AccordionHeadingText = styled.div<Props>`
  font-family: 'Poppins';
  font-weight: 600;
  font-size: ${(props) => (props.smFontSize ? props.smFontSize : "14px")};
  margin: 0px;
  color: ${(props) => (props.color ? props.color : "#000D09")};
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: ${(props) => (props.mdFontSize ? props.mdFontSize : "16px")};
  }
`;

export const AccordionCaptionText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #c4c4c4;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 14px;
  }
`;

export const StyledMobileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 5px;
`;

export const Accordion: React.FC<{ id: string; className?: string }> = (
  props
) => {
  return (
    <div
      className={clsx("accordion", props.className)}
      id={"accordion-" + props.id}
    >
      {props.children}
    </div>
  );
};

export const AccordionCard: React.FC = (props) => {
  return (
    <StyledAccordionItem className="card">{props.children}</StyledAccordionItem>
  );
};

export const AccordionCardHeader: React.FC<{ index: number }> = (props) => {
  return (
    <StyledCardHeader className="card-header" id={`heading-` + props.index}>
      <div
        className="d-flex justify-content-between align-items-center"
        data-toggle="collapse"
        data-target={"#collapse" + props.index}
        aria-expanded="false"
        aria-controls={"collapse" + props.index}
      >
        {props.children}
        <AccodionDownArrow />
      </div>
    </StyledCardHeader>
  );
};

export const AccordionDetails: React.FC<{
  accordionId: string;
  index: number;
}> = (props) => {
  const { accordionId, index } = props;
  return (
    <div
      id={"collapse" + index}
      className={"collapse"}
      aria-labelledby={`heading-` + props.index}
      data-parent={"#accordion-" + accordionId}
    >
      <AccordionBody className="card-body pt-0">
        <div className="d-block w-100">{props.children}</div>
      </AccordionBody>
    </div>
  );
};
