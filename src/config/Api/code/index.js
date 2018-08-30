import fetchApi from "../fetchApi";

export const code = {
  codefirst: () => {
    return fetchApi(`/codefirsts/`, null, "get");
  },
  codesecond: () => {
    return fetchApi(`/codeseconds/`, null, "get");
  }
};
