import React, { useState } from "react";
import { UserIcon } from "components/Icons";
import { DonCommonmodal } from "components/DonModal";
import { useWeb3Context } from "don-components";
import {
  useEffectOnTabFocus,
  useSignin,
  useStakingContract,
  useSuggestionApi,
} from "hooks";
import { IStoreState } from "interfaces";
import { useSelector } from "react-redux";
import { captureException } from "helpers";
import { Spinner } from "react-bootstrap";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import WalletPopup from "components/WalletPopup/WalletPopup";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import styled, { css } from "styled-components";

const CommentEditBox = styled.div`
  display: flex;
  padding-left: 20px;
  margin: 20px 0;
`;
const InputFieldCSS = css`
  background: #fff;
  border: 1px solid rgba(245, 245, 245, 0.5);
  border-radius: 10px;
  width: 100%;
  padding: 15px 20px;
  margin-left: 10px;
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
const TextArea = styled.textarea`
  ${InputFieldCSS}
`;
const CommentButton = styled.button`
  padding: 10px 20px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  border-radius: 10px;
  border: 0;
  background-color: yellow;
`;
const SigninButton = styled.button`
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

export const CommentEdit: React.FC<{
  suggestionId: string;
  refetchData: () => Promise<void>;
}> = ({ suggestionId, refetchData }) => {
  const [commentContent, setCommentContent] = useState("");
  const handleCommentChange = (e: any) => {
    setCommentContent(e.target.value);
  };
  const [hasCheckedDons, setHasChecked] = useState(false);
  const [showBuyDonModal, setShowBuyDonModal] = useState(false);
  const { connected, address } = useWeb3Context();
  const { signin } = useSignin();
  const { comment } = useSuggestionApi();
  const auth = useSelector((state: IStoreState) => state.auth);
  const { holdingDons, refetch } = useStakingContract();
  const { showFailure, showSuccess, showProgress } =
    useTransactionNotification();
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

  const handleCommentClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      return setShowConnectWalletPopup(true);
    }
    if (!hasDons) {
      return setShowBuyDonModal(true);
    }
    if (commentContent === "") return;
    try {
      showProgress("Posting Comment");
      const res_comment = await comment(suggestionId, commentContent);
      await refetchData();
      showSuccess("Comment Posted");

      return res_comment;
    } catch (e) {
      showFailure("Failed to Comment");
    } finally {
      // window.location.reload();
    }
  };

  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);

  return (
    <>
      <CommentEditBox>
        <UserIcon color="#000" fill="yellow" width="25" height="25" />
        <div style={{ width: "100%", paddingRight: "10px" }}>
          <TextArea
            rows={4}
            value={commentContent}
            onChange={handleCommentChange}
            placeholder="Start write comment here..."
          ></TextArea>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CommentButton onClick={handleCommentClick}>Send</CommentButton>
          </div>
        </div>
      </CommentEditBox>

      {showBuyDonModal && (
        <DonCommonmodal
          isOpen={showBuyDonModal}
          title={hasDons}
          variant="common"
          onClose={() => setShowBuyDonModal(false)}
          size="sm"
        >
          <BuyDonContent />
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
          <SigninButton onClick={handleSignIn}>
            {isCreating ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>Sign In</>
            )}
          </SigninButton>
        </DonCommonmodal>
      )}
    </>
  );
};
