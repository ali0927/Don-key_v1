import React, { useState } from "react";
import { SuggestCard } from "./SuggestCard";

export const SuggestList: React.FC<{
  suggestList: {
    id: number
    title: string;
    apy: number;
    votes: number;
    name: string;
    address: string;
    description: string;
    risk: number;
    comments: number;
    status: string;
    category: string;
  }[];
}> = (props) => {

  return (
    <>
      {props.suggestList.map((strategy) => {
        return (
          <div className="col-md-6 col-lg-4 mb-4">
            <SuggestCard suggest={strategy}/>
          </div>
        );
      })}
    </>
  );
};
