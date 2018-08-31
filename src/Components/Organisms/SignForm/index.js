import React from "react";
import { signupRequested, loginRequested } from "../../../Actions/auth";
import { connect } from "react-redux";
import { Form, Radio, Button } from "semantic-ui-react";
import StyledLink from "../../Atoms/StyledLink";
import Msg from "../../Atoms/Msg";

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleSignup: ({ username, password, research_id }) =>
      dispatch(signupRequested({ username, password, research_id })),
    handleSignin: ({ username, password }) =>
      dispatch(loginRequested({ username, password }))
  };
};

export class SignFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      research_type: 1,
      signup: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
    this.handleResearchType = this.handleResearchType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.signup.data !== nextProps.auth.signup.data) {
      this.setState({
        signup: false
      });
    }
  }
  handleChange(e) {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleMode() {
    this.setState(prevState => ({
      signup: !prevState.signup
    }));
  }

  handleSubmit() {
    const { username, password, research_type: research_id } = this.state;
    let submitMethod;
    if (this.state.signup) {
      submitMethod = this.props.handleSignup;
    } else {
      submitMethod = this.props.handleSignin;
    }
    submitMethod({
      username,
      password,
      research_id
    });
    this.setState(prevState => ({
      ...prevState,
      password: ""
    }));
  }

  handleResearchType(e, { value }) {
    this.setState({
      research_type: value
    });
  }

  handleErrorMsg() {
    const {
      error,
      signup: { error: signupError }
    } = this.props.auth;

    let initialMsg = {
      username: "",
      password: "",
      non_field_errors: ""
    };

    let msg = {};
    let originErr = this.state.signup ? signupError : error;
    if (originErr !== null) {
      for (let key in originErr.data) {
        if (originErr.data.hasOwnProperty(key)) {
          msg[key] = originErr.data[key][0];
        }
      }
    }
    return {
      ...initialMsg,
      ...msg
    };
  }

  render() {
    const {
      style,
      auth: { loading, error },
      ...rest
    } = this.props;
    return (
      <Form
        onSubmit={e => {
          this.handleSubmit();
          e.preventDefault();
        }}
      >
        <h3>{this.state.signup ? "Sign up" : "Log in"}</h3>
        <Form.Field>
          <label htmlFor="username">ID</label>
          <input
            type="text"
            name="username"
            placeholder="id"
            onChange={this.handleChange}
            autoFocus={true}
            value={this.state.username}
          />
          <Msg state={"error"}>{this.handleErrorMsg().username}</Msg>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Msg state={"error"}>{this.handleErrorMsg().password}</Msg>
        </Form.Field>
        {/* <Form.Field>
          <Radio
            label="Research A"
            name="radioGroup"
            value="1"
            checked={this.state.research_type == 1}
            onChange={this.handleResearchType}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Research B"
            name="radioGroup"
            value="2"
            checked={this.state.research_type == 2}
            onChange={this.handleResearchType}
          />
        </Form.Field> */}
        <Button
          type="submit"
          fluid
          loading={loading}
          disabled={loading}
          positive
        >
          {this.state.signup ? "Sign up" : "Log in"}
        </Button>
        <Msg state={"error"}>{this.handleErrorMsg().non_field_errors}</Msg>
        <StyledLink onClick={this.toggleMode}>
          {this.state.signup ? "Already had account?" : "Sign up"}
        </StyledLink>
      </Form>
    );
  }
}

const SignForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignFormView);
export default SignForm;
