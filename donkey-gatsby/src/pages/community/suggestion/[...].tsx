import { EmptySuggestion, SuggestionView } from "components/Suggest/SuggestionView";
import React from "react";
import {  Router } from "@reach/router";



export default function Suggestion() {
//   const { id } = useParams();
  return (
    <Router basepath="/community/suggestion">
    
      <SuggestionView path="/:id" />
      <EmptySuggestion path="/" />
    </Router>
  );
}
