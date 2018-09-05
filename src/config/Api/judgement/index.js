import fetchApi from "../fetchApi";

export const judgement = {
  list: ({ text }) => {
    return fetchApi(`/judgements/`, { text }, "post");
  },
  score: ({ judgement_id, payload: { question, score } }) => {
    return fetchApi(
      `/judgements/${judgement_id}/score/`,
      { question, score },
      "patch"
    );
  }
};
