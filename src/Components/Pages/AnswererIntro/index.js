import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

import answer_pic from "../../../static/answer.png";
import answer_read from "../../../static/answer_read.gif";
import answer_answer from "../../../static/answer_answer.gif";
import answer_select from "../../../static/answer_select.gif";
import answer_fetch from "../../../static/answer_fetch.gif";

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
    this.threshold = 4;
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
        <React.Fragment>
        <h1>Instruction - (3) Answer to Others’ Questions</h1>
        </React.Fragment>
        {this.state.pos === 0 && (
          <React.Fragment>
            <img src={answer_pic} style={{ margin: "0 auto" }} />
            <br />
            <p style={{fontSize:16}}>In this (3) Answer to others' questions step, you are going to see others’ question.
            <br />
            <br />
            Read questions raised by others and answer the questions that the article you read can
            directly answer.You should answer those questions using sentences from the article. 
            <br />
            <br /> 
            You have to answer 3 or more questions. Please answer many questions as you can.
            </p>
          </React.Fragment>
        )}
        {this.state.pos ===1 &&(
          <React.Fragment>
          <p>
          <p style={{fontSize:16}}> From now on, we will explain how you can answer the questions.</p>
            <p>
              <p style={{fontSize:16}}>1. Read questions and find some questions that you can answer with the information from the news article. </p>
              <img src={answer_read} style={{ margin: "0 auto" }} />
              <p style={{fontSize:14}}>
                  <ul>
                  <li>Note that the list can includes questions made from other news article. </li>
                  <li>Use provided information to understand the questions and evaluate whether it can be answered by the information frmo the news article that you read. 
                    <ul>
                      <li> Categories</li>
                      <li> Intention</li>
                      <li> Title</li>
                      <li> Paragraph</li>
                    </ul>
                  </li>
                </ul>
              </p>
            </p>
          </p>
        </React.Fragment>
        )}
        {this.state.pos ===2 &&(
          <React.Fragment>
          <p>
          <p style={{fontSize:16}}> From now on, we will explain how you can answer the questions.</p>
            <p>
              <p style={{fontSize:16}}>2. For questions that can be answered by the article that you read, click 'Add your answer' button. </p>
              <img src={answer_answer} style={{ margin: "0 auto" }} />
            </p>
          </p>
        </React.Fragment>
        )}
        {this.state.pos ===3 &&(
          <React.Fragment>
          <p>
          <p style={{fontSize:16}}> From now on, we will explain how you can answer the questions.</p>
            <p>
              <p style={{fontSize:16}}>3. Select sentence(s) from the artticle that can answer the question and then click 'Confirm' button. </p>
              <img src={answer_select} style={{ margin: "0 auto" }} />
            </p>
          </p>
        </React.Fragment>
        )}
        {this.state.pos ===4 &&(
          <React.Fragment>
          <p>
          <p style={{fontSize:16}}> From now on, we will explain how you can answer the questions.</p>
            <p>
              <p style={{fontSize:16}}> You can see more questions by clicking the 'See more questions' button. </p>
              <img src={answer_fetch} style={{ margin: "0 auto" }} />
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
                this.state.pos === this.threshold ? nextPage : this.nextPos
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

const AnswererIntro = connect(
  null,
  null
)(IntroView);

export default AnswererIntro;
