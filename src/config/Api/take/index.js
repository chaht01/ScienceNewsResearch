import fetchApi from "../fetchApi";

export const take = {
  list: call_cnt => {
    if (call_cnt === 0) return fetchApi(`/showns/`, null, "get");
    else return fetchApi(`/showns/`, null, "post");
  },
  highlight: ({ shown_id, payload }) => {
    return fetchApi(`/showns/${shown_id}/update_answertext/`, payload, "patch");
  }
};
