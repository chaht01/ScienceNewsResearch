import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

import title_pic from "../../../static/title_pic.png";
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
    const listing = ["1", "a", "i"];
    const before_instructions = [
      {
        text: "(Phase 1) Raise questions by yourself.",
        children: [
        ]
      },
      {
        text: "(Phase 2) If you cannot think of questions anymore by yourself, you can see questions made by other readers and raise more questions after getting inspired by them.",
        children: [
        ]
      }
    ];

  
    
    
    
   
    
    const recursive_listing = (depth, data) => {
      return (
        <ol type={listing[depth % 4]}>
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
            <h1>Instruction - (1) Question Before Reading</h1>
          </React.Fragment>
        {this.state.pos === 0 && (
          <React.Fragment>
            <img src={title_pic} style={{ margin: "0 auto" }} />
            <br />
            <p style={{fontSize:16}}>In this (1) Question before reading step, you are going to read the title of a news story. Based on the title, raise questions on what you expect to read from the content. 
            <br />
            <br />
            You can generate questions in two different phases.
            {recursive_listing(0, before_instructions)}
            You should generate 3 or more questions in total. However, please raise questions as many as you can.
            </p>
          </React.Fragment>
        )}

        {this.state.pos === 1 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>1. Type in your question and click ‘add’ button.</p>
                <img src={step1question} style={{ margin: "0 auto" }} />
              </p>
            </p>
          </React.Fragment>
        )}

        {this.state.pos === 2 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>2. Type in how your question helps you and other readers.</p>
                <img src={modalintention} style={{ margin: "0 auto" }} />
                <p style={{fontSize:14}}>
                  <ul>
                  <li>E.g., better evaluate the validity of the research</li>
                  <li>E.g., know how to use this finding in their everyday life</li>
                </ul>
              </p>
              </p>
            </p>
          </React.Fragment>
        )}
        {this.state.pos === 3 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>3. Categorize your question into one of the following group.</p>
                <img src={modalcategorize} style={{ margin: "0 auto" }} />
                <p style={{fontSize:14}}>
                <ul>
                  <li>Background - Background knowledge related to the topic.
                    <ul>
                    <li>Topic - General knowledge related to the topic.</li>
                    <li>Term and Jargon - Knowledge about terms or jargon appeared in the news story.</li>
                    <li>Other</li>
                    </ul>
                  </li>
                  <li>Research - Research itself.
                    <ul>
                      <li>Social Context - Social factors that may influence the research.</li>
                      <li>Research Design - How the research was conducted. </li>
                      <li>Treatment - Something regarded as cause/control.</li>
                      <li>Subject - Participants or subjects.</li>
                      <li>Measures - Variables measured in the research.</li>
                      <li>Data/Stats - Data collected in the research or statistics used in the research.</li>
                      <li>External Evidence - External evidence that supports or opposes the research findings.</li>
                      <li>Other</li>
                    </ul>
                  </li>
                  <li>Application - How the research is applied to people's life or can be extended to other subjects/agents.
                    <ul>
                      <li>Application -  Ways that people can apply the research findings.</li>
                      <li>Extension - Possible extensions of the research findings. </li>
                      <li>Other</li>
                     </ul>
                  </li>
                </ul>
                </p>
                <p style={{fontSize:16}}>You can see examples of each category <a  href="https://docs.google.com/spreadsheets/d/1eEBwurVjk9AylR3e702x_6ygWctCKrvZzSO1gu1o6GA/edit?usp=sharing" target="_blank">here</a>. <b>Please click this link now and do not close it until you finish the questioning task.</b> </p>

              </p>
            </p>
          </React.Fragment>
        )}
        {this.state.pos === 4 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}>4. Evaluate the similarity between your question and others’ question.</p>
                <img src={modalsimilarity} style={{ margin: "0 auto" }} />
                <br />
                <p style={{fontSize:16}}>You will see 10 of other's questions. For each question, evaluate how the question is similar to your question.</p>
                <p style={{fontSize:16}}>
                  <ul>
                  <li>Same - If the question asks the same information that your question asks.
                    <ul><li>E.g., "How many participants did they study?" and "What is the population size?"</li></ul>
                  </li>
                  <br />
                  <li>Similar - If the question is not the same as your question, but is closely related to your question.
                    <ul><li>E.g., "How many participants did they observe?" and "How old were the participants?</li></ul>
                  </li>
                  <br />
                  <li>Different - If the question asks for entirely different information. 
                    <ul><li>E.g., "How many participants did they observe?" and "What kind of fish is helpful for your brain?"</li></ul>
                  </li>
                  <br />
                  <li>Don't know - If you cannot understand the question and therefore cannot judge the similarity. </li>
                </ul>
              </p>
              </p>
            </p>
          </React.Fragment>
        )}
        
        {this.state.pos === 5 && (
          <React.Fragment>
            <p>
            <p style={{fontSize:16}}> From now on, we will explain how you can generate questions.</p>
              <p>
                <p style={{fontSize:16}}> If you can not think of a new question anymore, click 'I can not think of a new question' button at the bottom. </p>
                <p style={{fontSize:16}}> Discover questions generated by other readers. We hope seeing other readers' questions will inspire you to come up with new questions.</p>
                <img src={step2explore} style={{ margin: "0 auto" }} />
                <br />
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

const TitleQuestionerIntro = connect(
  null,
  null
)(IntroView);

export default TitleQuestionerIntro;
