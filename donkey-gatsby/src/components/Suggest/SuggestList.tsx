import React, { useState } from "react";
import { SuggestCard } from "./SuggestCard";
import { IStrapiSuggestion } from "interfaces";

const SuggestionWrapper = ({ strategy }: { strategy: IStrapiSuggestion }) => {
  const [votes, setVotes] = useState(strategy.votes.length);

  return (
    <SuggestCard votes={votes} setVotes={setVotes} suggestion={strategy} />
  );
};

export const SuggestList: React.FC<{
  suggestList: IStrapiSuggestion[];
}> = (props) => {
  return (
    <>
      {props.suggestList.map((strategy) => {
        return (
          <div className="col-md-6 col-lg-4 mb-4">
            <SuggestionWrapper strategy={strategy} />
          </div>
        );
      })}
    </>
  );
};
