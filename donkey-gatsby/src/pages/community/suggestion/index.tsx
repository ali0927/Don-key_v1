import React, { useEffect } from "react";
import { navigate } from "gatsby-link";

export default function _SuggestionRedirect() {
  useEffect(() => {
    navigate(`/community`);
  }, [])

  return <>
  </>;
}
