import React, { useState } from "react";
import { SuggestCard } from "./SuggestCard";
import { IStrapiSuggestion } from "interfaces";

export const SuggestList: React.FC<{
  suggestList: IStrapiSuggestion[];
}> = (props) => {

  return (
    <>
      {props.suggestList.map((strategy) => {
        return (
          <div className="col-md-6 col-lg-4 mb-4">
            <SuggestCard suggestion={strategy}/>
          </div>
        );
      })}
    </>
  );
};
