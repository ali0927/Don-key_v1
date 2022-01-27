import React, { useState, useEffect, useMemo } from "react";
import { ShowMoreContent } from "components/ShowmoreContent";
import { UserIcon } from "components/Icons";
import { BsCircleFill, BsFillChatRightDotsFill, BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs"
import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { useRiskImageList } from "components/Suggest/SuggestCard";
import { Comment } from "components/Suggest/Comment";
import { CommentEdit } from "components/Suggest/CommentEdit";
import { DonCommonmodal } from "components/DonModal";
import YellowBack from "images/yellow_background.png";
import { DummySuggestions } from "JsonData/DummyData";
import styled from "styled-components";
import { navigate } from "gatsby";

const SuggestionBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  margin: 30px 0;
  position: relative;
  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
  }
`;
const SuggestionTitle = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`
const SuggestionCategory = styled.label`
  background: #F5F5F5;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  font-size: 0.8rem;
  margin: 20px 0;
`
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
  @media (max-width: 768px) {
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
`
const SuggetionCommentRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
`
const SuggestionPath = styled.div`
  color: #000;
  margin: 20px 0;
  position: relative;
  font-weight: 500;
  @media (max-width: 768px) {
    display: none;
  }
`
const SuggetionNextButton = styled(BsArrowRightSquare)`
  cursor: pointer;
  margin: 10px;
  width: 25px;
  height: 25px;
  visibility: ${(props: { visible: boolean }) => props.visible ? 'visible': 'hidden'};
  @media (max-width: 768px) {
    display: none;
  }
`
const SuggetionPrevButton = styled(BsArrowLeftSquare)`
  cursor: pointer;
  margin: 10px;
  width: 25px;
  height: 25px;
  visibility: ${(props: { visible: boolean }) => props.visible ? 'visible': 'hidden'};
  @media (max-width: 768px) {
    display: none;
  }
`
const RiskDescriptionButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: 0.8rem;
  margin: 0 auto;
`

const generateRandomText = (length: number) => {
  const characters = ' abcdefghijklm nopqrstuvwxyz ';
  let result = ' ';
  const charactersLength = characters.length;
  for(let i = 0; i < length; i++) {
      result += 
      characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result
}

const generateRandomAddress = () => {
  const characters = 'abcdefghijklm0123456789';
  let result = '0x';
  const charactersLength = characters.length;
  for(let i = 0; i < 5; i++) {
      result += 
      characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += "..."
  for(let i = 0; i < 5; i++) {
    result += 
    characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result
}

export default function SuggestionView ({ 
  pageContext: { suggestionInfo }
  }: {
    pageContext: {
      suggestionInfo: any;
  };
}) {
  const [showRiskDetail, setShowRiskDetail] = useState(false)
  const riskImages = useRiskImageList()
  const suggestion = useMemo(() => {
    return suggestionInfo
  }, [suggestionInfo])

  const comments = useMemo(() => {
    const _comments = new Array(suggestion.comments).fill({}).map(item => {
      return {
        user: generateRandomAddress(),
        date: '1/15 Mon',
        content: generateRandomText(200),
        likes: Math.floor(Math.random() * 10)
      }
    })
    return _comments
  }, [suggestion.comments])

  const nextSuggestion = (e: any) => {
    navigate(`/community/suggestion/${suggestion.idx + 1}`)
  }
  const prevSuggestion = (e: any) => {
    navigate(`/community/suggestion/${suggestion.idx - 1}`)
  }

  return (
    <div style={{background:"#F5F5F5"}}>
      <NavBar />
      <BackImage>
        <img src={YellowBack} alt="yellow_back" />
      </BackImage>

      <div className="container">
        <SuggestionPath>
          {`Community page / User suggestions / ${suggestion.title}`}
        </SuggestionPath>

        <SuggestionBox>
          <div style={{display:'flex', marginBottom: '20px'}}>
            <SuggetionPrevButton visible={suggestion.idx > 0} onClick={prevSuggestion} />
            <SuggetionNextButton visible={DummySuggestions.length - 1 > suggestion.idx} onClick={nextSuggestion}/>
          </div>

          <div className="row">
            <div className="col-9 col-md-10" style={{display:'flex', flexDirection:'column'}}>
              <SuggestionTitle>{suggestion.title}</SuggestionTitle>
              <label style={{color: 'lightgrey'}}>{suggestion.date}</label>
            </div>
            <div className="col-3 col-md-2">
              <SuggestVotes>
                <span style={{fontSize:'0.8rem'}}>Votes</span>
                <span>{suggestion.votes}</span>
              </SuggestVotes>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-10" style={{display:'flex', flexDirection:'column'}}>
              <SuggestionCategory>{suggestion.category}</SuggestionCategory>
              <ShowMoreContent content={suggestion.description} length={270} />
            </div>
            <div className="col-sm-12 col-md-2">
              <div style={{display:'flex', flexDirection:'column', marginTop:'10px'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <UserIcon color="#000" fill="yellow" width="25" height="25"/> 
                  <SuggestionUser>{suggestion.name}</SuggestionUser>
                </div>
                <div className="row">
                  <div className="col-6 col-md-12">
                    <div style={{display:'flex', alignItems:'center'}}>
                      <BsCircleFill style={{width:25, height:6}} /> 
                      <SuggestionUser>{suggestion.status}</SuggestionUser>
                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <BsCircleFill style={{width:25, height:6}} /> 
                      <SuggestionUser>{`${suggestion.comments} comments`}</SuggestionUser>
                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <BsCircleFill style={{width:25, height:6}} /> 
                      <SuggestionUser>
                        {`${suggestion.apy}%`}
                        <span style={{color: 'lightgrey', marginLeft:'4px'}}>APY</span>
                      </SuggestionUser>
                    </div>
                  </div>
                  <div className="col-6 col-md-12" style={{display:'flex', flexDirection:'column'}}>
                    <SuggestionRiskImage src={riskImages[suggestion.risk].image.url} />
                    <RiskDescriptionButton onClick={() => setShowRiskDetail(true)}>
                      Risk Description
                    </RiskDescriptionButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SuggestionBox>

        <SuggetionCommentRow>
          <BsFillChatRightDotsFill />
          <span style={{marginLeft:'15px'}}>{`Comments (${suggestion.comments})`}</span>
        </SuggetionCommentRow>
        
        <CommentEdit />
        {comments.map(comment =>
          <Comment comment={comment}/>
        )}

      </div>      

      <Footer />

      <DonCommonmodal
        isOpen={showRiskDetail}
        title="Risk Description"
        variant="common"
        onClose={() => setShowRiskDetail(false)}
        size="sm"
      >
        <div className="row" style={{display:'flex', alignItems:'center', margin:'10px 0'}}>
          <div className="col-sm-12 col-md-4" style={{display:'flex'}}>
            <SuggestionRiskImage src={riskImages[suggestion.risk].image.url} style={{padding: 0}} />
          </div>
          <div className="col-sm-12 col-md-8" style={{fontSize:'0.8rem'}}>
            This is Risk level description. There are three levels for risk - Low, Medium, High. You can choose the level when create the suggestion.
          </div>
        </div>
      </DonCommonmodal>

    </div>
  )
}