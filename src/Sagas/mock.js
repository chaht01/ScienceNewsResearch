const types = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  NullBoolean: "nullBoolean"
};

class Mock {
  constructor(_template) {
    this.autoInc = 0;
    this.template = _template;
  }
  make(paramsObjOrArr) {
    let isArray = false;
    let paramsArr = [];
    if (Array.isArray(paramsObjOrArr)) {
      isArray = true;
      paramsArr = paramsObjOrArr;
    } else {
      paramsArr = [paramsObjOrArr];
    }

    const res = paramsArr.map(params => {
      this.autoInc++;
      const { template } = this;
      let dummy = {};
      Object.keys(template).forEach(key => {
        switch (template[key]) {
          case types.String:
            dummy[key] = Math.random()
              .toString(36)
              .substring(7);
            break;
          case types.Number:
            dummy[key] = Math.floor(Math.random() * 100);
            break;
          case types.Boolean:
            dummy[key] = false;
            break;
          case types.NullBoolean:
            dummy[key] = null;
            break;
          default:
            break;
        }
      });
      return {
        ...dummy,
        ...params,
        id: this.autoInc
      };
    });

    if (isArray) {
      return res;
    } else {
      return res[0];
    }
  }
}

export const QuestionMock = new Mock({
  research_id: types.Number,
  text: types.String,
  owner: types.String,
  created_phase: types.Number
  // selectedBeforeReading: types.Boolean, // (Deprecated) ~> Take
  // selectedAfterReading: types.Boolean, // (Deprecated) ~> Take
  // foundBeforeReading: types.NullBoolean, // (Deprecated) ~> Response
  // foundAfterReading: types.NullBoolean // (Deprecated) ~> Response
});

export const SentenceMock = new Mock({
  text: types.String
});

export const HighlightMock = new Mock({
  sentence_id: types.Number,
  question_id: types.Number,
  article_id: types.Number
});
