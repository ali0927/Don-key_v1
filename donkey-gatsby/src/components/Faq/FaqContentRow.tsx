import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";

const FAQContentWrapper = styled.div`
  cursor: pointer;
  padding-left: 33px !important;
  padding-right: 33px !important;
`;

const BorderStyled = styled.div`
  border-top: 2px solid #ebedee;
`;
const FAQContentTitle = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 24px;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

const FAQContentText = styled.div`
  padding-bottom: 40px;
  /* padding-top: 20px; */
  padding-left: 33px !important;
  padding-right: 20px !important;
`;

export const FaqContentRow = ({
  title,
  content,
}: {
  title: React.ReactElement | string;
  content: React.ReactElement | string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="row">
      <div className="offset-md-2"></div>
      <FAQContentWrapper
        onClick={() => setIsOpen((val) => !val)}
        className="col-md-10"
      >
        <BorderStyled>
          <div className="row">
            <FAQContentTitle className="col-10 col-md-8">
              {title}
            </FAQContentTitle>
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          <div className="row">
            {isOpen && (
              <FAQContentText className="col-md-10">{content}</FAQContentText>
            )}
          </div>
        </BorderStyled>
      </FAQContentWrapper>
    </div>
  );
};
