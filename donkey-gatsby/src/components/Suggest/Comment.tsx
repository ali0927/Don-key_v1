import React, { useState, useEffect, useMemo } from "react";
import { UserIcon } from "components/Icons";
import { BsFillCaretUpFill } from "react-icons/bs";
import { shortLargeAddress } from "helpers";
import { DonCommonmodal } from "components/DonModal";
import { useWeb3Context } from "don-components";
import {
  useEffectOnTabFocus,
  useSignin,
  useStakingContract,
  useSuggestionApi,
} from "hooks";
import { IStoreState } from "store/reducers/rootReducer";
import { useSelector } from "react-redux";
import { captureException } from "helpers";
import { Spinner } from "react-bootstrap";
import { TextArea } from "./SuggestCard";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import WalletPopup from "components/WalletPopup/WalletPopup";

import styled from "styled-components";

const CommentBox = styled.div`
  display: flex;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-transform: capitalize;
`;
const CommentUser = styled.label`
  font-weight: 600;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 5px 0 5px 10px;
  width: 100%;
`;
const ReplyButton = styled.button`
  border: none;
  background: transparent;
  margin-left: 20px;
  font-weight: 500;
`
const Like = styled.div`
  cursor: pointer;
`
const ReplyModalSubtitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin: 20px 0 10px 0;
`;
const ReplySubmitButton = styled.button`
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
const CommentReply = styled.div`
  font-size: 0.8rem;
`

export const Comment: React.FC<{
  comment: {
    id: string
    content: string
    likes: any[]
    created_at: string
    customer: any
    replies: any[]
  } 
}> = ( props ) => {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [hasCheckedDons, setHasChecked] = useState(false);
  const { connected, address } = useWeb3Context();
  const { signin } = useSignin();
  const auth = useSelector((state: IStoreState) => state.auth);
  const { holdingDons, refetch } = useStakingContract();
  const [replyContent, setReplyContent] = useState("");
  const { showFailure, showSuccess, showProgress } = useTransactionNotification();
  const { reply, like } = useSuggestionApi();
  const [isCreating, setIsCreating] = useState(false);

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

  const isLoggedIn = connected && auth.token;
  const [showConnectWalletPopup, setShowConnectWalletPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const handleReplyClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      return setShowConnectWalletPopup(true);
    }
    setShowReplyModal(true);
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      return setShowConnectWalletPopup(true);
    }
    const idx = comment.likes.findIndex((item: any) => item.address === address);
    if (address && idx !== -1) {
      showFailure("Your Like was already Added");
      return;
    }
    try {
      showProgress("Adding Like");
      const res_like = await like(comment.id);
      showSuccess("Your Like was Added");
      setComment(res_like);
      return res_like;
    } catch (e) {
      showFailure("Failed to Like");
    }
  }

  const handleSignIn = async () => {
    try {
      setIsCreating(true);
      if (!connected) {
        setShowConnectWalletPopup(true);
        return;
      }
      await signin();
      setShowSignInPopup(false);
    } catch (e) {
    } finally {
      setIsCreating(false);
    }
  };

  const handleReplyContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyContent(e.target.value);
  };

  const handleSubmitReply = async () => {
    if (replyContent === "") return;
    // setShowVoteModal(false);
    try {
      showProgress("Posting Reply");
      const res_reply = await reply(comment?.id, replyContent);
      showSuccess("Reply Posted");
      setComment({...comment, replies: [...comment.replies, res_reply]})
      return res_reply;
    } catch (e) {
      showFailure("Failed to Reply");
    } finally {
      setShowReplyModal(false);
    }
  };

  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);
  
  return (
    <>
    <CommentBox>
      <UserIcon color="#000" fill="yellow" width="25" height="25"/> 
      <div style={{width:'100%'}}>
        <CommentUser>
          {shortLargeAddress(comment?.customer.address, 4)}
          <span style={{color: 'lightgrey', marginLeft:'10px'}}>{comment?.created_at.slice(0, 10)}</span>
        </CommentUser>
        <div style={{overflowWrap: 'anywhere'}}>
          {comment?.content}
        </div>
        <div style={{display:'flex', alignItems:'center', margin:'10px 0'}}>
          <Like>
            <BsFillCaretUpFill style={{marginRight: '5px'}}/>
            <ReplyButton onClick={handleLikeClick} style={{marginLeft:'0px'}}>
              {`${comment?.likes.length} Likes`}
            </ReplyButton>
          </Like>
          <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
        </div>
        {comment?.replies.map((reply: any) => 
          <CommentReply>
            <div style={{display:'flex', alignItems:'center'}}>
              <UserIcon color="#000" fill="yellow" width="15" height="15"/>
              <span style={{margin: '0 10px'}}>{shortLargeAddress(reply.customer.address, 4)}</span>
              <span style={{color: 'lightgrey'}}>{reply.created_at.slice(0, 10)}</span>
            </div>
            <p style={{marginLeft: '20px'}}>
              {reply.content}
            </p>
          </CommentReply>
        )}
      </div>
    </CommentBox>

    {showReplyModal && (
      <DonCommonmodal
        isOpen={showReplyModal}
        title={hasDons && "Reply"}
        variant="common"
        onClose={() => setShowReplyModal(false)}
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
            <ReplyModalSubtitle>Leave a reply</ReplyModalSubtitle>
            <TextArea
              rows={4}
              value={replyContent}
              onChange={handleReplyContentChange}
              placeholder="Start write reply here..."
            ></TextArea>
            <ReplySubmitButton
              disabled={!!!replyContent}
              onClick={handleSubmitReply}
            >
              {isCreating ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>Reply</>
              )}
            </ReplySubmitButton>
          </>
        ) : (
          <BuyDonContent />
        )}
      </DonCommonmodal>
    )}
    {showConnectWalletPopup && (
      <WalletPopup
        onDone={() => setShowSignInPopup(true)}
        onClose={() => setShowConnectWalletPopup(false)}
      />
    )}

    {showSignInPopup && (
      <DonCommonmodal
        isOpen={showSignInPopup}
        title="Sign In"
        variant="common"
        onClose={() => setShowSignInPopup(false)}
        size="sm"
      >
        <h4 className="text-center">
          You need to Sign In . In order to Reply
        </h4>
        <ReplySubmitButton onClick={handleSignIn}>
          {isCreating ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>Sign In</>
          )}
        </ReplySubmitButton>
      </DonCommonmodal>
    )}
    </>
  )   
}