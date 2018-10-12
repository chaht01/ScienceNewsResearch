import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

import beforeQ from "../../../static/beforeQ.png";
import duringQ from "../../../static/duringQ.png";
import step1question from "../../../static/step1-question.gif";
import modalintention from "../../../static/modal-intention.gif";
import modalcategorize from "../../../static/modal-categorize.gif";
import modalsimilarity from "../../../static/modal-similarity.gif";
import step2explore from "../../../static/step2-explore.gif";
import step3selection from "../../../static/step3-selection.gif";
import step3question from "../../../static/step3-question.gif";
import step4explore from "../../../static/step4-explore.gif";

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
    this.threshold = 5;
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
    console.log(nextPage);
    const listing = ["1", "a", "i"];
    const during_instructions = [
      {
        text: "(Phase 1) Raise questions by yourself.",
        children: [
        ]
      },
      {
        text: "(Phase 2) If you cannot think of questions anymore by yourself, you can see questions made by others and raise more question after getting inspired by them. ",
        children: [
        ]
      }
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
                  <br />
                  {item.image && <img src={item.image} />}
                  <br />
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
        <React.Fragment>
            <h1>Instruction - (2) Question During Reading</h1>
          </React.Fragment>
        {this.state.pos === 0 && (
          <React.Fragment>
            <img src={duringQ} style={{ margin: "0 auto" }} />
            <br />
            <p style={{fontSize:16}}>In this (2) Question during reading step, you are going to read the article. Based on the article, raise questions on what you want to know but the article DOES NOT COVER. 
            <br />
            <br />
            As before, you can generate questions in two different phases.
            {recursive_listing(0, during_instructions)}
            You should riase 3 or more questions in total. However, please raise questions as many as you can.
            </p>
          </React.Fragment>
        )}
        {this.state.pos === 1 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>1. Click pen button and select sentence(s) that your question is related to or based on. </p>
                <img src={step3selection} style={{ margin: "0 auto" }} />
              </p>
            </p>
          </React.Fragment>
        )}

        {this.state.pos === 2 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>2. Type in how your question and click 'add' button.</p>
                <img src={step3question} style={{ margin: "0 auto" }} />
              </p>
            </p>
          </React.Fragment>
        )}

        {this.state.pos === 3 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>3. Fill in additional information, as before.</p>
                <img src={modalcategorize} style={{ margin: "0 auto" }} />
              </p>
            </p>
          </React.Fragment>
        )}

        {this.state.pos === 4 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>4. Evaluate the similarity between others' questions and your question, as before.</p>
                <img src={modalcategorize} style={{ margin: "0 auto" }} />
              </p>
              <p style={{fontSize:16}}>You can see examples of each category <a  href="https://docs.google.com/spreadsheets/d/1eEBwurVjk9AylR3e702x_6ygWctCKrvZzSO1gu1o6GA/edit?usp=sharing" target="_blank">here</a>. <b>Please click this link now and do not close it until you finish the questioning task.</b> </p> 
            </p>
          </React.Fragment>
        )}

        {this.state.pos === 5 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}> If you cannat think of new question anymore, click 'See others' questions' button. </p>
                <p style={{fontSize:16}}> Discover questions generated by other readers. We hope seeing other readers' questions will inspire you to come up with new questions.</p>
                <img src={step4explore} style={{ margin: "0 auto" }} />
                <br />
                <p style={{fontSize:14}}>
                  <ul>
                  <li>The sentence(s) that others' questions are made on will be highlighted.</li>
                  <li>If you hover on highlighted sentence, you can see questions made on that sentence.</li>
                </ul>
              </p>
              <p style={{fontSize:16}}>You can generate questions as before.</p>
              </p>
            </p>
          </React.Fragment>
        )}
        <StyledActionBar>
          <Button.Group>
            <Button onClick={this.prevPos} disabled={this.state.pos === 0}>
              Prev
            </Button>
            <Button
              onClick={
                this.state.pos === this.threfshold ? nextPage : this.nextPos
              }
              positive={this.state.pos === this.threshold}
            >
              {this.state.pos === this.threshold ? "Start" : "Next"}
            </Button>
          </Button.Group>
        </StyledActionBar>
      </StyledIntro>
    );
  }
}

const BodyQuestionerIntro = connect(
  null,
  null
)(IntroView);

export default BodyQuestionerIntro;
