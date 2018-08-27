import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button, Tab } from "semantic-ui-react";
import { StyledSegment } from "../../Atoms/StyledSegment";
import { StyledAside, StyledSticky } from "../../Atoms/StyledAside";
import Suggestion from "../../Molecules/Suggestion";
import QuestionForm from "../../Molecules/QuestionForm";
import {
  quesitonType,
  questionQuestionExpandToggle
} from "../../../Actions/question";
import {
  questionHighlightModeUndo,
  questionHighlightActiveTab,
  questionHighlightSaveRequest
} from "../../../Actions/questionHighlight";
import QuestionerQuestion from "../../Molecules/QuestionerQuestion";
import AnswererQuestion from "../../Molecules/AnswererQuestion";
import { pageNextRequest } from "../../../Actions/page";
import { PAGES } from "../../../Reducers/page";
import QuestionCRUDModal from "../QuestionCRUDModal";

const mapStateToProps = (state, ownProps) => {
  return {
    questions: state.questionReducer.data,
    highlights: state.questionHighlightReducer,
    article: state.articleReducer.data,
    typed: state.questionReducer.typed,
    user_detail: state.authReducer.signup.data,
    page: state.pageReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionTyping: typed => dispatch(quesitonType(typed)),
    undoHighlightMode: () => dispatch(questionHighlightModeUndo()),
    saveHighlights: (question_id, sentence_ids) =>
      dispatch(questionHighlightSaveRequest(question_id, sentence_ids)),
    activeTab: tabIdx => dispatch(questionHighlightActiveTab(tabIdx)),
    toStep4: () => {
      dispatch(questionHighlightActiveTab(1));
      dispatch(pageNextRequest(PAGES.QUESTIONER_STEP4, []));
    },
    toAnswererIntro: () => dispatch(pageNextRequest(PAGES.ANSWERER_INTRO, [])),
    expandQuestion: question_id =>
      dispatch(questionQuestionExpandToggle(question_id))
  };
};

const OmissionPoolSegment = StyledSegment.extend`
  margin-bottom: 1.5em;
  ${props => props.basis && `flex: ${props.basis};`};
`;

const ConditionalQuestionTab = ({
  page,
  questions = [],
  username,
  highlights: {
    inProgress: { active: highlightMode, question: highlightTargetQuestion },
    hover: { sentence_id: hoveredSentenceId },
    activeTabIdx,
    _tabNames
  },
  activeTab,
  startHighlight,
  expandQuestion
}) => {
  const conditionalPane = () => {
    const questionMine = questions.filter(q => q.owner === username);
    const questionOthers = questions.filter(q => q.owner !== username);
    const defaultPanes = [
      {
        menuItem: _tabNames[0],
        render: () => (
          <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
            <StyledSticky.ScrollablePane>
              {questionMine.length === 0 && "You haven’t raised question yet."}
              {hoveredSentenceId === null || highlightMode
                ? questionMine.map(question => (
                    <QuestionerQuestion
                      key={question.id}
                      question={question}
                      expanded={question._expanded}
                      onExpandChange={() => expandQuestion(question.id)}
                      editable
                      annotable
                      focused={
                        highlightTargetQuestion !== null &&
                        highlightTargetQuestion.id === question.id
                      }
                      reAnnotate={() => startHighlight(question)}
                    />
                  ))
                : questionMine
                    .filter(q => q.refText.indexOf(hoveredSentenceId) > -1)
                    .map(question => (
                      <QuestionerQuestion
                        key={question.id}
                        question={question}
                        expanded={question._expanded}
                        onExpandChange={() => expandQuestion(question.id)}
                        editable
                        annotable
                        reAnnotate={() => startHighlight(question)}
                      />
                    ))}
            </StyledSticky.ScrollablePane>
          </StyledSticky.Scrollable>
        )
      }
    ];
    if (page === PAGES.QUESTIONER_STEP4) {
      return defaultPanes.concat([
        {
          menuItem: _tabNames[1],
          render: () => (
            <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
              <StyledSticky.ScrollablePane>
                {questionOthers.length === 0 && "No raised question yet."}
                {hoveredSentenceId === null || highlightMode
                  ? questionOthers.map(question => (
                      <QuestionerQuestion
                        key={question.id}
                        question={question}
                        expanded={question._expanded}
                        onExpandChange={() => expandQuestion(question.id)}
                      />
                    ))
                  : questionOthers
                      .filter(q => q.refText.indexOf(hoveredSentenceId) > -1)
                      .map(question => (
                        <QuestionerQuestion
                          key={question.id}
                          question={question}
                          expanded={question._expanded}
                          onExpandChange={() => expandQuestion(question.id)}
                        />
                      ))}
              </StyledSticky.ScrollablePane>
            </StyledSticky.Scrollable>
          )
        }
      ]);
    }
    return defaultPanes;
  };

  const handleTabChange = (event, { activeIndex }) => {
    activeTab(activeIndex);
  };

  return (
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={conditionalPane()}
      activeIndex={activeTabIdx}
      onTabChange={handleTabChange}
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginBottom: "2em"
      }}
    />
  );
};

const OmissionPoolView = ({
  article: { title, sentences: content },
  questions,
  user_detail: { username },
  typed,
  questionTyping,
  addQuestion,
  page,
  highlights,
  startHighlight,
  undoHighlightMode,
  activeTab,
  toStep4,
  toAnswererIntro,
  expandQuestion,
  saveHighlights: _saveHighlights
}) => {
  const {
    inProgress: {
      data: highlightInProgress,
      active: highlightMode,
      question: highlightTargetQuestion
    }
  } = highlights;
  const highlightedSentences = highlightInProgress
    .map(sid => content.filter(s => s.id === sid)[0])
    .map(s => s.text);

  const handleTyped = value => {
    questionTyping(value);
  };
  const clearType = () => {
    questionTyping("");
  };

  const handleSubmit = promsingQuestion => {
    _saveHighlights(promsingQuestion.id, highlightInProgress);
  };

  const saveHighlights = () => {
    _saveHighlights(highlightTargetQuestion.id, highlightInProgress);
  };

  const conditionalFooter = () => {
    if (highlightMode) {
      if (highlightTargetQuestion === null) return null;
      else return null;
    } else {
      if (page === PAGES.QUESTIONER_STEP3) {
        return (
          <StyledSticky.Footer>
            <StyledSticky.Action
              onClick={toStep4}
              disabled={page.loading}
              loading={page.loading}
              content="Finish and see other's question"
            />
          </StyledSticky.Footer>
        );
      } else if (page === PAGES.QUESTIONER_STEP4) {
        return (
          <StyledSticky.Footer>
            <StyledSticky.Action
              onClick={toAnswererIntro}
              disabled={page.loading}
              loading={page.loading}
              content="Done"
            />
          </StyledSticky.Footer>
        );
      }
      return null;
    }
  };
  return (
    <StyledAside>
      <StyledSticky>
        {highlightMode ? (
          <OmissionPoolSegment
            basis={1.5}
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <StyledSegment.Header>
              {highlightTargetQuestion === null
                ? "Raise questions that this article DOES NOT ANSWER."
                : "Reselect sentences or change question."}
            </StyledSegment.Header>
            <StyledSegment.Pane
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden"
              }}
            >
              <div>1. Select sentence(s) that your question is based on.</div>
              {highlightedSentences.length > 0 ? (
                <Suggestion
                  items={highlightedSentences}
                  style={{ flex: 1, overflow: "auto", marginBottom: 0 }}
                />
              ) : (
                <div
                  style={{
                    flex: 1,
                    justifySelf: "center",
                    alignSelf: "center"
                  }}
                >
                  any sentence not selected yet
                </div>
              )}
            </StyledSegment.Pane>
            {highlightTargetQuestion === null &&
            highlightInProgress.length > 0 ? (
              <StyledSegment.Pane>
                <div>2. Type in your question.</div>
                <QuestionForm
                  onSubmit={handleSubmit}
                  handleTyped={handleTyped}
                  typed={typed}
                  clearType={clearType}
                />
              </StyledSegment.Pane>
            ) : (
              <StyledSegment.Pane>
                <Button.Group fluid basic>
                  <Button
                    compact
                    content="Cancel"
                    onClick={undoHighlightMode}
                  />
                  <Button
                    compact
                    positive
                    disabled={highlightInProgress.length === 0}
                    onClick={saveHighlights}
                    content="Done"
                  />
                </Button.Group>
              </StyledSegment.Pane>
            )}
          </OmissionPoolSegment>
        ) : (
          <OmissionPoolSegment>
            <StyledSegment.Header>
              Raise questions that this article DOES NOT ANSWER. You can start
              by clicking{" "}
              <Button circular positive icon="tasks" size="mini" active />button.
            </StyledSegment.Header>
          </OmissionPoolSegment>
        )}
        <ConditionalQuestionTab
          page={page}
          username={username}
          questions={questions}
          highlights={highlights}
          activeTab={activeTab}
          startHighlight={startHighlight}
          expandQuestion={expandQuestion}
        />
        {conditionalFooter()}
      </StyledSticky>
    </StyledAside>
  );
};

const OmissionPool = connect(
  mapStateToProps,
  mapDispatchToProps
)(OmissionPoolView);
export default OmissionPool;
