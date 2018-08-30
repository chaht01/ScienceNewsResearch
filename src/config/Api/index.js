import { authorize } from "./authorize";
import { article } from "./article";
import { storeItem, clearItem } from "./storage/";
import { question } from "./question";
import { take } from "./take";
import { code } from "./code";
import { sentence } from "./sentence";
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
  code,
  sentence,
  fetchApi
};

export default Api;
