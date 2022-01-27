import React from "react";
import { UserIcon } from "components/Icons";
import { BsFillCaretUpFill } from "react-icons/bs";
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

export const Comment: React.FC<{
  comment: {
    user: string
    date: string
    content: string
    likes: number
  }
}> = ({ comment }) => {
  return (
    <CommentBox>
      <UserIcon color="#000" fill="yellow" width="25" height="25"/> 
      <div style={{width:'100%'}}>
        <CommentUser>
          {`${comment.user}`}
          <span style={{color: 'lightgrey', marginLeft:'10px'}}>{comment.date}</span>
        </CommentUser>
        <div style={{overflowWrap: 'anywhere'}}>
          {comment.content}
        </div>
        <div style={{display:'flex', alignItems:'center', margin:'10px 0'}}>
          <Like>
            <BsFillCaretUpFill style={{marginRight: '10px'}}/>
            <span>{`${comment.likes} Likes`}</span>
          </Like>
          <ReplyButton>Reply</ReplyButton>
        </div>
      </div>
    </CommentBox>
  )   
}