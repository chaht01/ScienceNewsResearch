import fetchApi from "../fetchApi";

export const question = {
  pool: (article_id, created_phase) => {
    return fetchApi(`/articles/${article_id}/questions/`, null, "get", {
      params: {
        created_phase
      }
    });
  },
  create: payload => {
    return fetchApi(`/questions/`, payload, "post");
  },
  update: ({ question_id, payload }) => {
    return fetchApi(`/questions/${question_id}/`, payload, "patch");
  },
  update_reftexts: ({ question_id, payload }) => {
    return fetchApi(
      `/questions/${question_id}/update_reftexts/`,
      payload,
      "patch"
    );
  }
};
