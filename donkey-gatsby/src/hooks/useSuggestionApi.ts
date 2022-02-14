import { strapi } from "strapi";
import { ISuggestFormState } from "components/Suggest/SuggestRequestForm";

export const fetchSuggestionList = async () => {
  const resp = await strapi.get("/suggestions");
  return resp.data;
};

export const useSuggestionApi = () => {
  const fetchList = async () => {
    const resp = await strapi.get("/suggestions");
    return resp.data;
  };

  const createSuggestion = async (formState: ISuggestFormState) => {
    const {
      nickName,
      telegram,
      apy,
      title,
      description,
      address,
      network,
      risk,
      riskword
    } = formState;

    const resp = await strapi.post("/suggestions", {
      nickName,
      telegram,
      apy,
      title,
      description,
      address,
      network,
      risk,
      riskword
    });
    return resp.data;
  };

  return {
    fetchList,
    createSuggestion
  };
};
