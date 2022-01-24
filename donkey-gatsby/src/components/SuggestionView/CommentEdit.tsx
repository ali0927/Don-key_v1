import React, { useState } from "react";
import { UserIcon } from "components/Icons";
import { BsFillCaretUpFill } from "react-icons/bs";
import styled, { css } from "styled-components";

const CommentEditBox = styled.div`
  display: flex;
  padding-left: 20px;
  margin: 20px 0;
`;
const InputComment = styled.div`

`
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
`

export const CommentEdit: React.FC = () => {
  const [comment, setComment] = useState('')
  const handleCommentChange = (e: any) => {
    setComment(e.target.value)
  }

  return (
    <CommentEditBox>
      <UserIcon color="#000" fill="yellow" width="25" height="25"/> 
      <div style={{width: '100%', paddingRight:'10px'}}>
        <TextArea
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Start write comment here..."
        ></TextArea>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <CommentButton>Send</CommentButton>
        </div>
      </div>
    </CommentEditBox>
  )   
}