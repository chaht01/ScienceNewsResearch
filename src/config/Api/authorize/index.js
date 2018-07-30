import fetchApi from "../fetchApi";

export const authorize = {
  signup: (username, password) => {
    return fetchApi("/users/", { username, password }, "post");
  },
  user: username => {
    return fetchApi(`/users/${username}/`, "get");
  },
  auth: (username, password) => {
    return fetchApi("/api-token-auth/", { username, password }, "post").then(
      res => res.token
    );
  },
  profile: id => {
    return fetchApi(`/profiles/${id}/`, "get");
  }
};
