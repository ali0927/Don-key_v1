import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { navigate } from "gatsby-link";
import { UserIcon } from "components/Icons";
import { AiOutlineMessage } from "react-icons/ai";
import { DonCommonmodal } from "components/DonModal";
import { BsFillCaretUpFill } from "react-icons/bs";
import {
  useEffectOnTabFocus,
  useSignin,
  useStakingContract,
  useSuggestionApi,
} from "hooks";
import { IStoreState, IStrapiSuggestion } from "interfaces";
import { useWeb3Context } from "don-components";

import { useSelector } from "react-redux";
import WalletPopup from "components/WalletPopup/WalletPopup";
import { Spinner } from "react-bootstrap";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import { captureException } from "helpers";

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

const STATUS_MAP = {
  unverified: { color: "#33cc33", backColor: "#ccffcc", text: "Unverified" },
  new: { color: "#33cc33", backColor: "#ccffcc", text: "New" },
  old: { color: "#0066ff", backColor: "#ccffcc", text: "Old" },
  approved: { color: "#660033", backColor: "#ccffcc", text: "Approved" },
};


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
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;
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
  &:disabled {
    opacity: 0.9;
  }
`;
const VoteModalSubtitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin: 20px 0 10px 0;
`;
const VoteButton = styled.button`
  padding: 30px;
  font-weight: 500;
  font-size: 1rem;
  color: #000;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 0;
  background-color: yellow;
 
  margin-right: 30px;
  @media (max-width: 600px) {
    padding: 10px 30px;
  }
  &:disabled {
    background-color: ${STATUS_MAP.new.backColor};
    color: ${STATUS_MAP.new.text}
  }
`;
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
`;
export const TextArea = styled.textarea`
  ${InputFieldCSS}
`;


type SuggestStatusType = keyof typeof STATUS_MAP;

export const SuggestCard: React.FC<{
  suggestion: IStrapiSuggestion;
  votes: number;
  setVotes: (votes: number) => void;
}> = (props) => {
  const { vote, comment, hasVoted } = useSuggestionApi();
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { holdingDons, refetch } = useStakingContract();
  const { showFailure, showSuccess, showProgress } =
    useTransactionNotification();
  const [hasCheckedDons, setHasChecked] = useState(false);
  const { connected, address } = useWeb3Context();
  const [hasVotedBool, setHasVoted] = useState(false);
  const { signin } = useSignin();
  const auth = useSelector((state: IStoreState) => state.auth);
  useEffectOnTabFocus(() => {
    (async () => {
      setHasChecked(false);
      try {
        await refetch();
      } catch (e) {
        captureException(e, "UseEffect Accelerated APY Modal");
      } finally {
        setHasChecked(true);
      }
    })();
  }, [address]);

  const checkHasVoted = async () => {
    if (auth.token) {
      setHasChecked(false);
      setHasVoted(await hasVoted(props.suggestion.id));
      setHasChecked(true);
    }
  };

  useEffectOnTabFocus(() => {
    if (showVoteModal) {
      checkHasVoted();
    }
  }, [auth.token, showVoteModal]);

  const handleSignIn = async () => {
    try {
      setIsCreating(true);
      await signin();
    } catch (e) {
    } finally {
      setIsCreating(false);
    }
  };
  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentContent(e.target.value);
  };

  const handleCommentClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setShowVoteModal(true);
  };

  const handleSubmitComment = async () => {
    if (commentContent === "") return;
    // setShowVoteModal(false);
    try {
      showProgress("Posting Comment");
      const res_comment = await comment(props.suggestion.id, commentContent);
      showSuccess("Comment Posted");
      return res_comment;
    } catch (e) {
      showFailure("Failed to Comment");
    } finally {
      setShowVoteModal(false);
    }
  };

  const handleSubmitVote = async () => {
    try {
      showProgress("Adding Vote");
      const res_vote = await vote(props.suggestion.id);
      showSuccess("Your Vote was Added");
      props.setVotes(res_vote.votes);
      setHasVoted(true);
    } catch (e) {
      showFailure("Failed to vote");
    } finally {
      // setShowVoteModal(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/community/suggestion/${props.suggestion.id}`);
  };
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);

  return (
    <div>
      <SuggestCardSection onClick={() => handleCardClick()}>
        <div className="row">
          <div className="col-9">
            <SuggestTitle>{props.suggestion.title}</SuggestTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SuggestStatus
                status={props.suggestion.status as SuggestStatusType}
              >
                <SuggestStatusTitle>
                  {
                    STATUS_MAP[props.suggestion.status as SuggestStatusType]
                      .text
                  }
                </SuggestStatusTitle>
              </SuggestStatus>
              <SuggestStatusTitle>
                {`${props.suggestion.apy}%`}
                <span style={{ color: "lightgrey", marginLeft: "4px" }}>
                  APY
                </span>
              </SuggestStatusTitle>
            </div>
          </div>
          <SuggestVotesBox className="col-3">
            <SuggestVotes>
              <span style={{ fontSize: "0.6rem" }}>Votes</span>
              <span>{props.votes}</span>
            </SuggestVotes>
          </SuggestVotesBox>
        </div>
        <SuggestDescription>{props.suggestion.description}</SuggestDescription>
        <div className="row">
          <div
            className="col-6"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <UserIcon color="#000" fill="yellow" width="25" height="25" />
              <SuggestAddress>{props.suggestion.nickName}</SuggestAddress>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineMessage size="25px" />
              <SuggestAddress>{`${props.suggestion.comments.length} Comments`}</SuggestAddress>
            </div>
          </div>
          <div className="col-6">
            <SuggestRiskImage src={props.suggestion.risk.image.url} />
          </div>
        </div>
        <CommentButton onClick={handleCommentClick}>
          Comment &amp; Vote
        </CommentButton>
      </SuggestCardSection>

      {showVoteModal && connected && auth.token && (
        <DonCommonmodal
          isOpen
          title={hasDons && "Comment and Vote"}
          variant="common"
          onClose={() => setShowVoteModal(false)}
          size="sm"
        >
          {!hasCheckedDons ? (
            <div
              style={{ minHeight: 200 }}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner animation="border" />{" "}
            </div>
          ) : hasDons ? (
            <>
              <VoteModalSubtitle>Vote</VoteModalSubtitle>
              <div style={{ display: "flex", alignItems: "center" }}>
                <VoteButton
                  disabled={hasVotedBool}
                  onClick={!hasVotedBool ? handleSubmitVote : () => {}}
                >
                  {!hasVotedBool && (
                    <BsFillCaretUpFill style={{ marginRight: "20px" }} />
                  )}
                  {hasVotedBool ? "Voted": "Vote"}
                </VoteButton>
                <h3 style={{ fontWeight: 600, margin: 0 }}>{props.votes}</h3>
              </div>
              <VoteModalSubtitle>Leave a comment</VoteModalSubtitle>
              <TextArea
                rows={4}
                value={commentContent}
                onChange={handleCommentContentChange}
                placeholder="Start write comment here..."
              ></TextArea>
              <CommentButton
                disabled={!!!commentContent}
                onClick={handleSubmitComment}
              >
                {isCreating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>Comment &amp; Vote</>
                )}
              </CommentButton>
            </>
          ) : (
            <BuyDonContent />
          )}
        </DonCommonmodal>
      )}
      {showVoteModal && !connected && !auth.token && (
        <WalletPopup
          onDone={() => {}}
          onClose={() => setShowVoteModal(false)}
        />
      )}

      {showVoteModal && connected && !auth.token && (
        <DonCommonmodal
          isOpen
          title="Sign In"
          variant="common"
          onClose={() => setShowVoteModal(false)}
          size="sm"
        >
          <h4 className="text-center">
            You need to Sign In . In order to Comment
          </h4>
          <CommentButton onClick={handleSignIn}>
            {isCreating ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>Sign In</>
            )}
          </CommentButton>
        </DonCommonmodal>
      )}
    </div>
  );
};
