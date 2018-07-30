import fetchApi from "../fetchApi";

export const take = {
  list: user_id => {
    return fetchApi(`/users/${user_id}/takes/`, null, "get");
  },
  create: (article_id, question_id, phase) => {
    return fetchApi(
      `/takes/`,
      { article: article_id, question: question_id, phase },
      "post"
    );
  },
  release: (take_id, removed_phase) => {
    return fetchApi(
      `/takes/${take_id}/`,
      { remove: true, removed_phase },
      "patch"
    );
  },
  update: (take_id, found) => {
    return fetchApi(`/takes/${take_id}/renew_milestone/`, { found }, "patch");
  },
  highlight: (take_id, found, sentences) => {
    return fetchApi(
      `/takes/${take_id}/renew_milestone/`,
      { found, sentences },
      "patch"
    );
  }
};
