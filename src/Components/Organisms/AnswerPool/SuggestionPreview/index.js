import React from "react";
import { StyledSegment } from "../../../Atoms/StyledSegment";
import { StyledQuestionText } from "../../../Atoms/StyledQuestion";
import Suggestion from "../../../Molecules/Suggestion";

const SuggestionPreview = ({ highlightedSentences, targetQuestion }) => {
  return (
    <React.Fragment>
      <StyledSegment>
        <StyledSegment.Header>
          Select sentences that can be answer to the question below from
          text(left).
        </StyledSegment.Header>
        <StyledQuestionText focused={true} focusColor={targetQuestion.color}>
          {targetQuestion.text}
        </StyledQuestionText>
      </StyledSegment>
      {highlightedSentences.length > 0 && (
        <StyledSegment>
          <StyledSegment.Header>
            Updated Suggestion will be:{" "}
          </StyledSegment.Header>
          <Suggestion items={highlightedSentences} />
        </StyledSegment>
      )}
    </React.Fragment>
  );
};

export default SuggestionPreview;
