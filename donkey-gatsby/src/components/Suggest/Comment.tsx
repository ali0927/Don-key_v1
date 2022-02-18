import React, { useState, useEffect, useMemo } from "react";
import { useSuggestionApi } from "hooks";
import { UserIcon } from "components/Icons";
import { BsFillCaretUpFill } from "react-icons/bs";
import { shortLargeAddress } from "helpers";
import { gql, useQuery } from "@apollo/client";
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
const COMMENT_QUERY = gql`
  query getCommentQuery($id: String!) {
    comments (
      where: {
        id: $id
      }
    ) {
      content
      likes {
        address
      }
      created_at
      customer {
        address
      }
      replies {
        content
        customer {
          address
        }
      }     
    }
  }
`;

export const Comment: React.FC<{
  comment: {
    content: string
    likes: []
    created_at: string
    customer: any
    replies: []
  } 
}> = ({ comment }) => {
  
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