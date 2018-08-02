import fetchApi from "../fetchApi";

export const question = {
  pool: (research_id, created_phase) => {
    return fetchApi(`/researches/${research_id}/questions/`, null, "get", {
      params: {
        created_phase
      }
    });
  },
  create: payload => {
    return fetchApi(`/questions/`, payload, "post");
  }
};
