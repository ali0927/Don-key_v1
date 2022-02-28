import React, { useState, useEffect } from "react";
import { ShowMoreContent } from "components/ShowmoreContent";
import { UserIcon } from "components/Icons";
import {
  BsCircleFill,
  BsFillChatRightDotsFill,
  BsArrowLeftSquare,
  BsArrowRightSquare,
} from "react-icons/bs";
import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { Comment } from "components/Suggest/Comment";
import { CommentEdit } from "components/Suggest/CommentEdit";
import { DonCommonmodal } from "components/DonModal";
import YellowBack from "images/yellow_background.png";
import styled from "styled-components";
import { DonGatsbyLink } from "components/DonGatsbyLink";
import { gql, useQuery } from "@apollo/client";

const SuggestionBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  margin: 30px 0;
  position: relative;
  @media (max-width: 600px) {
    padding: 20px;
    margin: 10px;
  }
`;
const SuggestionTitle = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;
const SuggestionCategory = styled.label`
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  font-size: 0.8rem;
  margin-bottom: 20px;
`;
const BackImage = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 320px;
  }
`;
const SuggestVotes = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 10px 20px 10px;
  padding: 10px 0;
  @media (max-width: 600px) {
    margin: 0;
    padding: 20px 0;
    font-size: 1rem;
  }
`;
const SuggestionUser = styled.label`
  font-weight: 600;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 5px 0 5px 10px;
  width: 100%;
`;
const SuggestionRiskImage = styled.img`
  width: 100%;
  margin: 10px auto 0 auto;
  padding: 0px 20px;
  max-width: 160px;
`;
const SuggetionCommentRow = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
`;
const SuggestionPath = styled.div`
  margin: 20px 0;
  position: relative;
  font-weight: 500;
  @media (max-width: 600px) {
    display: none;
  }
`;
const SuggetionNextButton = styled(BsArrowRightSquare)`
  cursor: pointer;
  margin: 10px;
  width: 25px;
  height: 25px;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "visible" : "hidden"};
  @media (max-width: 600px) {
    display: none;
  }
`;
const SuggetionPrevButton = styled(BsArrowLeftSquare)`
  cursor: pointer;
  margin: 10px;
  width: 25px;
  height: 25px;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "visible" : "hidden"};
  @media (max-width: 600px) {
    display: none;
  }
`;
const RiskDescriptionButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: 0.8rem;
  margin: 0 auto;
`;
const SuggestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;
const SuggestionLink = styled(DonGatsbyLink)`
  text-decoration: none !important;
  color: #000;
`;

const SUGGESTION_QUERY = gql`
  query getSuggestionsQuery($id: String!) {
    suggestions(where: { id: $id }) {
      apy
      description
      id
      status
      title
      created_at
      network {
        name
      }
      risk {
        Title
        image {
          url
        }
        id
      }
      riskword
      nickName
      customer {
        address
      }
      comments {
        id
        content
        created_at
        customer {
          address
        }
        likes {
          address
        }
        replies {
          content
          customer {
            address
          }
          created_at
        }
      }
      votes {
        address
      }
    }
  }
`;

export const SuggestionView = ({ id }: { id: number }) => {
  const [showRiskDetail, setShowRiskDetail] = useState(false);
  const { data: suggestionsData } = useQuery(SUGGESTION_QUERY, {
    variables: {
      id,
    },
  });
  const [suggestion, setSuggestion] = useState(suggestionsData?.suggestions[0]);

  useEffect(() => {
    setSuggestion(suggestionsData?.suggestions[0]);
  }, [suggestionsData, id]);

  const addComment = (comment: any) => {
    setSuggestion({
      ...suggestion,
      comments: [...suggestion.comments, comment],
    });
  };

  return (
    <div style={{ background: "#F5F5F5" }}>
      <NavBar />
      <BackImage>
        <img src={YellowBack} alt="yellow_back" />
      </BackImage>

      <div className="container">
        <SuggestionPath>
          <SuggestionLink to="/community">Community page</SuggestionLink> /{" "}
          <SuggestionLink to="/community">User suggestions</SuggestionLink> /
          <span style={{ fontWeight: 600 }}>{suggestion?.title}</span>
        </SuggestionPath>

        <SuggestionBox>
          {/* <div style={{ display: "flex", marginBottom: "20px" }}>
            <SuggetionPrevButton
              visible={suggestion?.id! > 1}
              onClick={prevSuggestion}
            />
            <SuggetionNextButton
              visible={suggestionCount - 1 > suggestion?.id!}
              onClick={nextSuggestion}
            />
          </div> */}

          <div className="row">
            <div
              className="col-9 col-md-10"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <SuggestionTitle>{suggestion?.title}</SuggestionTitle>
              <label style={{ color: "lightgrey" }}>
                {suggestion?.created_at.slice(0, 10)}
              </label>
            </div>
            <div className="col-3 col-md-2">
              <SuggestVotes>
                <span style={{ fontSize: "0.8rem" }}>Votes</span>
                <span>{suggestion?.votes.length}</span>
              </SuggestVotes>
            </div>
          </div>

          <div className="row">
            <div
              className="col-sm-12 col-md-10"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <ShowMoreContent
                content={suggestion?.description || ""}
                length={270}
              />
            </div>
            <div className="col-sm-12 col-md-2">
              <SuggestionInfo>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <UserIcon color="#000" fill="yellow" width="25" height="25" />
                  <SuggestionUser>{suggestion?.nickName}</SuggestionUser>
                </div>
                <div className="row">
                  <div className="col-6 col-md-12">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <BsCircleFill style={{ width: 25, height: 6 }} />
                      <SuggestionUser>{suggestion?.status}</SuggestionUser>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <BsCircleFill style={{ width: 25, height: 6 }} />
                      <SuggestionUser>{`${suggestion?.comments.length} comments`}</SuggestionUser>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <BsCircleFill style={{ width: 25, height: 6 }} />
                      <SuggestionUser>
                        {`${suggestion?.apy}%`}
                        <span style={{ color: "lightgrey", marginLeft: "4px" }}>
                          APY
                        </span>
                      </SuggestionUser>
                    </div>
                  </div>
                  <div
                    className="col-6 col-md-12"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <SuggestionRiskImage src={suggestion?.risk.image.url} />
                    <RiskDescriptionButton
                      onClick={() => setShowRiskDetail(true)}
                    >
                      Risk Description
                    </RiskDescriptionButton>
                  </div>
                </div>
              </SuggestionInfo>
            </div>
          </div>
        </SuggestionBox>

        <SuggetionCommentRow>
          <BsFillChatRightDotsFill />
          <span
            style={{ marginLeft: "15px" }}
          >{`Comments (${suggestion?.comments.length})`}</span>
        </SuggetionCommentRow>

        <CommentEdit suggestionId={suggestion?.id} addComment={addComment} />
        {suggestion?.comments.map((comment: any) => (
          <Comment comment={comment} />
        ))}
      </div>

      <Footer />

      <DonCommonmodal
        isOpen={showRiskDetail}
        title="Risk Description"
        variant="common"
        onClose={() => setShowRiskDetail(false)}
        size="sm"
      >
        <div
          className="row"
          style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
        >
          <div className="col-sm-12 col-md-4" style={{ display: "flex" }}>
            <SuggestionRiskImage
              src={suggestion?.risk.image.url}
              style={{ padding: 0 }}
            />
          </div>
          <div className="col-sm-12 col-md-8" style={{ fontSize: "0.8rem" }}>
            {suggestion?.riskword || "No risk description"}
          </div>
        </div>
      </DonCommonmodal>
    </div>
  );
};
