import fetchApi from "../fetchApi";

export const sentence = {
  list: () => {
    return fetchApi(`/sentence/`, null, "get");
  },
  detail: id => {
    return fetchApi(`/sentence/${id}/`, null, "get");
  },
  refText: payload => {
    return fetchApi(`/reftexts/`, payload, "post");
  }
};
