import React, { useState, useEffect, useMemo } from "react";
import { ShowMoreContent } from "components/ShowmoreContent";
import { UserIcon } from "components/Icons";
import { BsCircleFill, BsFillChatRightDotsFill, BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs"
import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { useRiskImageList } from "components/Suggest/SuggestCard";
import { Comment } from "./Comment";
import { CommentEdit } from "./CommentEdit";
import YellowBack from "images/yellow_background.png";
import styled from "styled-components";

import { dummyFiltered } from "components/Suggest";

const SuggestionBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  margin: 30px 0;
  position: relative;
  @media (max-width: 568px) {
    padding: 20px;
  }
`;
const SuggestionTitle = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
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
  font-weight: 500;
  margin: 0 10px 20px 10px;
  padding: 10px 0;
  @media (max-width: 568px) {
    margin-top: 20px;
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
  margin 10px 0;
  padding: 0px 20px;
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
`
const SuggetionNextButton = styled(BsArrowLeftSquare)`
  cursor: pointer;
  margin: 10px;
  width: 25px;
  height: 25px;
`
const SuggetionPrevButton = styled(BsArrowRightSquare)`
  cursor: pointer;
  margin: 10px;
  width: 25px;
  height: 25px;
`
export const SuggestionView = ({ id }: {id: string}) => {
  const riskImages = useRiskImageList()
  const suggestion = useMemo(() => {
    return dummyFiltered[parseInt(id)]
  }, [id])

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

  const comments = useMemo(() => {
    const _comments = new Array(suggestion.comments).fill({}).map(item => {
      return {
        user: generateRandomText(10),
        date: '1/15 Mon',
        content: generateRandomText(200),
        likes: Math.floor(Math.random() * 10)
      }
    })
    return _comments
  }, [suggestion.comments])

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

        <SuggestionBox className="row">
          <div className="col-sm-12 col-md-10" style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', marginBottom: '20px'}}>
              <SuggetionNextButton />
              <SuggetionPrevButton />
            </div>
            <SuggestionTitle>{suggestion.title}</SuggestionTitle>
            <label style={{color: 'lightgrey'}}>{suggestion.date}</label>
            <SuggestionCategory>{suggestion.category}</SuggestionCategory>
            <ShowMoreContent content={suggestion.description} length={280} />
          </div>
          <div className="col-sm-12 col-md-2">
            <SuggestVotes>
              <span style={{fontSize:'10px'}}>Votes</span>
              <span>{suggestion.votes}</span>
            </SuggestVotes>
            <div>
              <div style={{display:'flex', alignItems:'center'}}>
                <UserIcon color="#000" fill="yellow" width="25" height="25"/> 
                <SuggestionUser>{suggestion.name}</SuggestionUser>
              </div>
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
              <SuggestionRiskImage src={riskImages[suggestion.risk].image.url} />
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
    </div>
  )
}