import fetchApi from "../fetchApi";

export const question = {
  pool: research_id => {
    return fetchApi(`/researches/${research_id}/questions/`, null, "get");
  },
  create: payload => {
    return fetchApi(`/questions/`, payload, "post");
  }
};
