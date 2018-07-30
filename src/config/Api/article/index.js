import fetchApi from "../fetchApi";

export const article = {
  meta: id => {
    return fetchApi(`/articles/${id}/`, null, "get");
  },
  sentence: id => {
    return fetchApi(`/sentences/${id}/`, null, "get");
  }
};
