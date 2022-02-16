import { strapi } from "strapi";
import { ISuggestFormState } from "components/Suggest/SuggestRequestForm";
import { IStoreState } from "store/reducers/rootReducer";
import {  useSelector } from "react-redux";

export const useSuggestionApi = () => {
  const auth = useSelector((state: IStoreState) => state.auth);

  const fetchList = async () => {
    const resp = await strapi.get("/suggestions");
    return resp.data;
  };

  const getSuggestion = async (id: number) => {
    const resp = await strapi.get(`/suggestions/${id}`);
    return resp.data;
  }

  const getCount = async () => {
    const resp = await strapi.get(`/suggestions/count`);
    return resp.data;
  }

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
    },
    {
      headers: { 'access-token': `${auth.token}` }
    });
    return resp.data;
  };

  const vote = async (id: number) => {
    const resp = await strapi.put(`/suggestions/vote/${id}`, {}, {
      headers: { 'access-token': auth.token }
    })
    return resp.data;
  }

  const comment = async (suggestion: number, content: string) => {
    const resp = await strapi.post(`/comments`, {
      suggestion,
      content
    }, 
    {
      headers: { 'access-token': `${auth.token}` }
    })
    return resp.data;
  }

  return {
    fetchList,
    getSuggestion,
    getCount,
    createSuggestion,
    vote,
    comment
  };
};
