import React from "react";
import { StyledSegment } from "../../Atoms/StyledSegment";
import Suggestion from "../../Molecules/Suggestion";
import AnswererQuestion from "../../Molecules/AnswererQuestion";
import { StyledSticky } from "../../Atoms/StyledAside";

const SuggestionPreview = ({ highlightedSentences, targetQuestion }) => {
  return (
    <React.Fragment>
      <StyledSegment.Header>
        Highlight text in the article to ANSWER
      </StyledSegment.Header>
      <AnswererQuestion question={targetQuestion} expanded={true} />
      {highlightedSentences.length > 0 && (
        <React.Fragment>
          <StyledSegment.Header>
            Above question's answer can be:{" "}
          </StyledSegment.Header>
          <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
            <StyledSticky.ScrollablePane>
              <Suggestion items={highlightedSentences} />
            </StyledSticky.ScrollablePane>
          </StyledSticky.Scrollable>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SuggestionPreview;
