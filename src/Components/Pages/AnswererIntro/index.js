import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

import answer_pic from "../../../static/answer.png";
import answergif from "../../../static/answering.gif";

const StyledContainer = styled.div`
  padding-top: 3em;
`;

const StyledIntro = styled.div`
  max-width: 800px;
  margin: auto;
  margin-top: 3em;
  & img {
    display: block;
    max-width: 80%;
  }
`;
const StyledActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class IntroView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0
    };
    this.threshold = 3;
    this.nextPos = this.nextPos.bind(this);
    this.prevPos = this.prevPos.bind(this);
  }
  nextPos() {
    this.setState(prevState => ({
      pos: Math.min(prevState.pos + 1, this.threshold)
    }));
  }
  prevPos() {
    this.setState(prevState => ({ pos: Math.max(prevState.pos - 1, 0) }));
  }
  render() {
    const { nextPage } = this.props;
    const listing = ["1", "a", "i"];
    const instructions = [
      {
        text: "Read questions.",
        children: [
          {
            text:
              "Note that the list include questions made from other article. "
          },
          {
            text:
              "Use provided information to understand the questions made by others.",
            children: [
              { text: "Categories" },
              { text: "Intention" },
              { text: "Title" },
              { text: "Paragraph" }
            ]
          }
        ]
      },
      {
        text:
          "For questions that the article can directly answer, click ‘Add your answer’",
        image: answergif
      },
      {
        text:
          "Select sentence(s) from the article that can answer the question. "
      },
      { text: "You can see more questions by clicking ‘Fetch more’ button. " },
      { text: "Please answer many questions as you can. " }
    ];
    const recursive_listing = (depth, data) => {
      return (
        <ol type={listing[depth % 3]}>
          {data.map(item => {
            return (
              <React.Fragment>
                <li>
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  <br />
                  {item.image && <img src={item.image} />}
                </li>
                {item.children &&
                  item.children.length > 0 &&
                  recursive_listing(depth + 1, item.children)}
              </React.Fragment>
            );
          })}
        </ol>
      );
    };

    return (
      <StyledIntro>
        <h1>Instruction - (3) Answer to Others’ Questions</h1>
        <img src={answer_pic} style={{ margin: "0 auto" }} />
        In this step, you are going to see others’ question. Read questions
        raised by others and answer the questions that the article you read can
        directly answer. You should answer those questions using sentences from
        the article. You have to answer 3 or more questions. Please answer many
        questions as you can.
        <br />
        <br />
        You can generate questions in two different phase.
        {recursive_listing(0, instructions)}
        <StyledActionBar>
          <Button onClick={nextPage} positive>
            Start
          </Button>
        </StyledActionBar>
      </StyledIntro>
    );
  }
}

const AnswererIntro = connect(
  null,
  null
)(IntroView);

export default AnswererIntro;
