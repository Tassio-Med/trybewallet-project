import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableBtn: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validButton();
    });
  }

  validButton = () => {
    const { email, password } = this.state;
    this.setState({
      disableBtn: true,
    });
    const validEmail = email.match(/\S+@\S+\.\S+/);
    const minPassword = 6;
    if (password.length >= minPassword && validEmail) {
      this.setState({ disableBtn: false });
    }
  }

  loginCLick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { submitEmail, history } = this.props;
    submitEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disableBtn } = this.state;
    return (
      <form>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
          placeholder="Password"
        />
        <button
          type="submit"
          onClick={ this.loginCLick }
          disabled={ disableBtn }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  submitEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
