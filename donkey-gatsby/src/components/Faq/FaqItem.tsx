import clsx from "clsx";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";

const FAQRow = styled.div`
  cursor: pointer;
`;
const StyledBorder = styled.div`
  &:not(:last-of-type) {
    border-bottom: 2px solid #ebedee;
  }
  /* &.is-open {
    border-bottom: 0;
  } */
  /* &:not(:first-of-type) {
    border-top: 2px solid #ebedee;
  } */
`;

const FAQSectionTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  padding: 60px 0;
  &.is-open {
    padding-bottom: 30px;
  }

  @media (max-width: 767px) {
    font-size: 24px;
    padding: 20px 0;
  }
`;
const FAQIconWrapper = styled.div`
  display: flex;
  padding: 60px 0;
  &.is-open {
    padding-bottom: 30px;
  }
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    padding: 10px 10px;
    justify-content: start;
  }
`;

const IconImage = styled.div`
  height: 54px;
  background-color: #fff037;
  width: 54px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FAQItem = ({
  img,
  title,
  children,
}: {
  img: string;
  title: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledBorder>
        <FAQRow
          className={clsx("row p-3 align-items-center")}
          onClick={() => {
            setIsOpen((val) => !val);
          }}
        >
          <FAQIconWrapper className={clsx({ "is-open": isOpen }, "col-md-2")}>
            <IconImage>
              <img src={img} alt={title} />
            </IconImage>
          </FAQIconWrapper>
          <div className="col-10 col-md-8">
            <FAQSectionTitle className={clsx({ "is-open": isOpen })}>
              {title}
            </FAQSectionTitle>
          </div>
          <FAQIconWrapper className="col-2 col-md-2">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </FAQIconWrapper>
        </FAQRow>
        {isOpen ? children : null}
      </StyledBorder>
    </>
  );
};
