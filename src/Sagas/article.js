import { delay } from "redux-saga";
import { call, put, all, race, takeLatest, take } from "redux-saga/effects";
import {
  articleArticleFetchFailure,
  articleArticleFetchSuccess
} from "../Actions/article";
import { types } from "../Actions/article";
import {
  questionPoolFetchRequest,
  questionPoolFetchSuccess
} from "../Actions/question";
import { HighlightMock } from "./mock";
import Api from "../config/Api";

const remote_articles = [
  {
    id: 1,
    research_id: 1,
    title:
      "Caffeine in pregnancy may lead to overweight children, study suggests",
    content: [
      {
        id: 1,
        text: `Women who drink too much coffee in pregnancy are more likely to have overweight children, a new study has shown.`
      },
      {
        id: 2,
        text: `Youngsters whose mothers drank the equivalent of more than three cups of coffee a day were found to be more than 1lb heavier than children of women consumed little or no caffeine by the age of eight.`
      },
      {
        id: 3,
        text: `Researchers from the Norwegian Institute of Public Health, studied 51,000 women over a nine year period and discovered a linear link between the consumption of more caffeine and larger children.`
      },
      {
        id: 4,
        text: `Current NHS advice suggests women should drink no more than 200mg of caffeine per day, the equivalent of two cups. But the Norwegian researchers said 'complete avoidance' could be safer.`
      },
      {
        id: 5,
        text: `Caffeine passes rapidly through tissues, including the placenta, and takes the body longer to get rid of during pregnancy. It has been linked to a heightened risk of miscarriage and restricted fetal growth.`
      },
      {
        id: 6,
        text: `The researchers say there is a plausible biological explanation which could account for the excess weight gain. They believe caffeine may change ‘fetal programming’ and modify the overall weight trajectory of the child.`
      },
      {
        id: 7,
        text: `“The results add supporting evidence for the current advice to reduce caffeine intake during pregnancy and indicate that complete avoidance might actually be advisable,” said Dr Eleni Papadopoulou.`
      },
      {
        id: 8,
        text: `During the study women mums-to-be were asked to quantify their food and drink intake from among 255 items, including caffeine, using a specially adapted Food Frequency Questionnaire.`
      },
      {
        id: 9,
        text: `Daily intake was grouped into: 0-49 mg (low); 50-199 mg (average); 200-299 mg (high); and 300 + mg (very high).`
      },
      {
        id: 10,
        text: `Average, high, and very high caffeine intake during pregnancy were associated with a heightened risk of faster excess growth during their child’s infancy than low intake, after taking account of potentially influential factors.`
      },
      {
        id: 11,
        text: `And exposure to any caffeine level while in the womb was associated with a heightened risk of overweight at the ages of 3 and 5 years, although this persisted only for those 8 year olds whose mums had had a very high caffeine intake during their pregnancy.`
      },
      {
        id: 12,
        text: `Children exposed to very high levels of caffeine before birth weighed 67-83 g more in infancy (3-12 months); 110-136 g more as toddlers; 213-320 g more as pre-schoolers (3-5 years); and 480g more at the age of 8 than children who had been exposed to low levels.`
      },
      {
        id: 13,
        text: `The research was published in the journal BMJ Open.`
      }
    ]
  }
];

function* fetchArticleAsync({ type, payload }) {
  try {
    yield call(delay, 1000);
    const article_meta = yield call(Api.article.meta, payload.id);
    const sentences = yield all(
      article_meta.sentences.map(sentence_id =>
        call(Api.article.sentence, sentence_id)
      )
    );
    const article = {
      ...article_meta,
      sentences
    };
    yield put(articleArticleFetchSuccess(article));
  } catch (error) {
    yield put(articleArticleFetchFailure(error));
  }
}

export function* watchFetchArticleAsync() {
  yield takeLatest(types.ARTICLE_FETCH_REQUEST, fetchArticleAsync);
}
