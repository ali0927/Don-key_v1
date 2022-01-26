import React, { useState } from "react";
import styled, { css } from "styled-components";
import { navigate } from "gatsby-link";
import { UserIcon } from "components/Icons";
import { AiOutlineMessage } from "react-icons/ai";
import { DonCommonmodal } from "components/DonModal";
import { BsFillCaretUpFill } from "react-icons/bs";
import { useStaticQuery, graphql } from "gatsby";

const SuggestCardSection = styled.div`
padding: 50px 25px;
background: #ffffff;
box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
border-radius: 20px;
transition: transform 0.3s linear;
cursor: pointer;
&:hover {
    transform: translateY(-5px);
}
`;
const SuggestTitle = styled.h4`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 54px;
  margin-bottom: 12px;
`;
const SuggestStatus = styled.div`
  border-radius: 4px;
  width: fit-content;
  padding: 4px 10px;
  margin-right: 15px;
  ${(props: { status: SuggestStatusType }) => {
    return css`
      background: ${STATUS_MAP[props.status as "new"].backColor};
      color: ${STATUS_MAP[props.status as "new"].color};
    `;
  }}

`;
const SuggestVotesBox = styled.div`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`
const SuggestStatusTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;
const SuggestVotes = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 650;
`;
const SuggestDescription = styled.p`
  margin: 20px 0;
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
          line-clamp: 3; 
  -webkit-box-orient: vertical;
`;
const SuggestAddress = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 10px;
  margin-bottom: 0;
  width: 100%;
`;
const CommentButton = styled.button`
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  border-radius: 10px;
  background: linear-gradient(146.14deg, #353a4b 0%, #0b0e12 100%);
  border: 0;
  display: block;
  width: 100%;
  margin-top: 20px;
`;
const VoteModalSubtitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin: 20px 0 10px 0;
`
const VoteButton = styled.button`
  padding: 30px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 0;
  background-color: yellow;
  margin-right: 30px;
`
const InputFieldCSS = css`
  background: rgba(245, 245, 245, 0.5);
  border: 1px solid rgba(245, 245, 245, 0.5);
  border-radius: 10px;
  width: 100%;
  padding: 15px 20px;
  &::placeholder {
    color: #767b86;
  }
  font-weight: 500;
  &:focus {
    outline: none;
    background-color: #fff;
    border: 1px solid rgba(245, 245, 245, 1);
  }
`;
const SuggestRiskImage = styled.img`
  padding-left: 20px;
  width: 100%;
`
export const TextArea = styled.textarea`
  ${InputFieldCSS}
`;

const STATUS_MAP = {
  new: { color: "#33cc33", backColor: "#ccffcc", text: "New" },
  old: { color: "#0066ff", backColor: "#ccffcc", text: "Old" },
  approved: { color: "#660033", backColor: "#ccffcc", text: "Approved" },
};

type SuggestStatusType = keyof typeof STATUS_MAP;

export const useRiskImageList = () => {
  const riskImages = useStaticQuery(
    graphql`
      query StrapiRisks {
        allStrapiRisks {
          nodes {
            Title
            image {
              url
            }
          }
        }
      }
    `
  );
  return riskImages.allStrapiRisks.nodes
}

export const SuggestCard: React.FC<{ 
  suggest: { 
    idx: number;
    title: string;
    apy: number;
    votes: number;
    address: string;
    description: string;
    risk: number;
    comments: number;
    status: String;
  }
}> = (props)  => {
  const riskImages = useRiskImageList()
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [comment, setComment] = useState('')
  const handleCommentChange = (e: any) => {
    setComment(e.target.value)
  }
  const handleCommentClick = (e: any) => {
    e.stopPropagation();
    setShowVoteModal(true)
  }
  const handleCardClick = () => {
    navigate(`/community/suggestion/${props.suggest.idx}`);
  }

  return (
    <div>
      <SuggestCardSection onClick={() => handleCardClick()}>
        <div className="row">
          <div className="col-9">
            <SuggestTitle>{props.suggest.title}</SuggestTitle>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <SuggestStatus status={props.suggest.status as SuggestStatusType}>
                <SuggestStatusTitle>{STATUS_MAP[props.suggest.status as SuggestStatusType].text}</SuggestStatusTitle>
              </SuggestStatus>
              <SuggestStatusTitle>
                {`${props.suggest.apy}%`}
                <span style={{color: 'lightgrey', marginLeft:'4px'}}>APY</span>
              </SuggestStatusTitle>
            </div>
          </div>
          <SuggestVotesBox className="col-3">
            <SuggestVotes>
              <span style={{fontSize:'0.6rem'}}>Votes</span>
              <span>{props.suggest.votes}</span>
            </SuggestVotes>
          </SuggestVotesBox>
        </div>
        <SuggestDescription>
          {props.suggest.description}
        </SuggestDescription>
        <div className="row">
          <div className="col-6" style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <UserIcon color="#000" fill="yellow" width="25" height="25"/> 
              <SuggestAddress>{props.suggest.address}</SuggestAddress>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
              <AiOutlineMessage size="25px"/> 
              <SuggestAddress>{`${props.suggest.comments} Comments`}</SuggestAddress>
            </div>
          </div>
          <div className="col-6">
            <SuggestRiskImage src={riskImages[props.suggest.risk].image.url} />
          </div>
        </div>
        <CommentButton onClick={(e) => handleCommentClick(e)}>
          Comment &amp; Vote
        </CommentButton>
      </SuggestCardSection>

      <DonCommonmodal
        isOpen={showVoteModal}
        title="Comment and Vote"
        variant="common"
        onClose={() => setShowVoteModal(false)}
        size="sm"
      >
        <VoteModalSubtitle>Vote</VoteModalSubtitle>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <VoteButton onClick={() => setShowVoteModal(true)}>
            <BsFillCaretUpFill style={{marginRight: '20px'}}/>
            Vote
          </VoteButton>
          <h3 style={{fontWeight:600, margin:0}}>{props.suggest.votes}</h3>
        </div>
        <VoteModalSubtitle>Leave a comment</VoteModalSubtitle>
        <TextArea
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Start write comment here..."
        ></TextArea>
        <CommentButton onClick={() => setShowVoteModal(false)}>
          Submit Comment
        </CommentButton>
      </DonCommonmodal>
  </div>

  )
}