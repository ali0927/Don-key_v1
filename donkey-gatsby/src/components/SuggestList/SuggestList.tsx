import React, { useState } from "react";
import { SuggestCard } from "./SuggestCard";

export const SuggestList: React.FC<{
  suggestList: {
    title: string;
    apy: number;
    votes: number;
    address: string;
    description: string;
    risk: number;
    comments: number;
    status: string;
  }[];
}> = (props) => {

  return (
    <>
      {props.suggestList.map((strategy) => {
        return (
          <div className="col-md-4 mb-5">
            <SuggestCard suggest={strategy}/>
          </div>
        );
      })}
    </>
  );
};
