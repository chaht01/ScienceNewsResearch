import { authorize } from "./authorize";
import { article } from "./article";
import { storeItem, clearItem } from "./storage/";
import { question } from "./question";
import { take } from "./take";
import asyncTest from "./asyncTest";
import fetchApi from "./fetchApi";
const Api = {
  authorize,
  article,
  question,
  storeItem,
  clearItem,
  asyncTest,
  take,
  fetchApi
};

export default Api;
