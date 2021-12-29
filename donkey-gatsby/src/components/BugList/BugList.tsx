import { ShowMoreContent } from "components/ShowmoreContent";
import styled, { css } from "styled-components";

const BugCard = styled.div`
  padding: 50px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  transition: transform 0.3s linear;
  cursor: default;
  &:hover {
      transform: translateY(-5px);
  }
`;

const BugTitle = styled.h4`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 12px;
`;

const BugDescription = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  min-height: 100px;
`;

const BugProgressTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 10px;
`;

const STATUS_MAP = {
  notstarted: { color: "rgba(0,0,0,0)", text: "Fixing is not started" },
  complete: { color: "#7FCA8E", text: "Fixing is complete" },
  inprogress: { color: "#FFC406", text: "Fixing is in process" },
};

type BugStatusType = keyof typeof STATUS_MAP;

const ProgressBackground = styled.div`
  background: linear-gradient(to top, #f2f4f7 0%, #f0f2f5 48.04%, #ffffff 100%);
  border-radius: 10px;
  width: 100%;
  position: relative;
  height: 8px;
  /* overflow: hidden; */

  border: 1px solid #e5e6ea;

  &::after {
    display: block;
    content: "";

    position: absolute;
    height: calc(100% + 2px);
    left: -1px;
    top: -1px;
    border-radius: 10px 0 0 10px;
    ${(props: { status: BugStatusType; progress: number }) => {
      return css`
        background: ${STATUS_MAP[props.status as "notstarted"].color};
        width: calc(${props.progress}% + 2px);
      `;
    }}
  }
`;

const Check = (props: any) => {
  return (
    <svg
      width={36}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={18} cy={18} r={18} fill="#7FCA8E" />
      <path
        d="m13 18.8 3.143 3.2L24 14"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BugProgress = (props: {
  status: BugStatusType;
  progress: number;
}) => {
  return (
    <div className="d-flex">
      {props.status === "complete" && (
        <div className="mr-2">
          <Check />
        </div>
      )}
      <div style={{ flexBasis: "100%" }}>
        <BugProgressTitle>{STATUS_MAP[props.status].text}</BugProgressTitle>
        <ProgressBackground status={props.status} progress={props.progress} />
      </div>
    </div>
  );
};

export const BugCardList = (props: {
  bugs: {
    title: string;
    description: string;
    status: BugStatusType;
    progress: number | null;
  }[];
}) => {
  return (
    <>
      {props.bugs.map((bug) => {
        return (
          <div className="col-md-4 mb-5">
            <BugCard>
              <BugTitle>{bug.title}</BugTitle>
              <BugDescription className="pb-4">
                <ShowMoreContent content={bug.description} length={100} />
              </BugDescription>
              <BugProgress status={bug.status} progress={bug.progress || 0} />
            </BugCard>
          </div>
        );
      })}
    </>
  );
};
