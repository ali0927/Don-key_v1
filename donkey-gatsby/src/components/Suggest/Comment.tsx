import React, { useState, useEffect } from "react";
import { useSuggestionApi } from "hooks";
import { UserIcon } from "components/Icons";
import { BsFillCaretUpFill } from "react-icons/bs";
import { shortLargeAddress } from "helpers";
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
  commentId: number
}> = ({ commentId }) => {
  const { getComment } = useSuggestionApi();
  const [comment, setComment] = useState<{
    id: number
    content: string
    likes: []
    suggestion: any
    created_at: string
    customer: any
    replies: []
  } | null>(null);

  const getCommentById = async (id: number) => {
    const _comment = await getComment(id);
    setComment(_comment);
  }

  useEffect(() => {
    getCommentById(commentId);
  }, [commentId])
  
  return (
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
            <BsFillCaretUpFill style={{marginRight: '10px'}}/>
            <span>{`${comment?.likes.length} Likes`}</span>
          </Like>
          <ReplyButton>Reply</ReplyButton>
        </div>
      </div>
    </CommentBox>
  )   
}