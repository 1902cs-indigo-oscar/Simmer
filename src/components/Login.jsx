import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, clearError } from '../store';

class Login extends Component {
  state = {
    fields: [
      {
        name: 'email',
        label: 'Email',
        fasType: 'fas fa-envelope',
      },
      {
        name: 'password',
        label: 'Password',
        fasType: 'fas fa-key',
      },
    ],
  };

  componentDidMount() {
    this.props.resetError();
  }

  renderInputFields(name, label, fasType, i) {
    return (
      <div className="field is-horizontal" key={i}>
        <div className="field-label is-normal">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded has-icons-left">
              <input
                className="input"
                type={name}
                placeholder={label}
                name={name}
                required
              />
              <span className="icon is-small is-left">
                <i className={fasType} />
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { fields } = this.state;
    const { name, handleSubmit, error } = this.props;
    return (
      <section className="hero is-fullheight-with-navbar has-background-primary has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-weight-semibold">Log In</h1>
            <div className="columns is-centered">
              <div className="column is-half">
                <form className="" onSubmit={handleSubmit} name={name}>
                  {fields.map(({ name, label, fasType }, i) => {
                    return this.renderInputFields(name, label, fasType, i);
                  })}
                  <br />
                  <button className="button is-danger" type="submit">
                    Submit
                  </button>
                  <br />
                  <br />
                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapState = state => ({
  name: 'login',
  error: state.user.error,
});

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const { history } = ownProps;
    dispatch(auth(email, password, formName, null, null, history));
  },
  resetError() {
    dispatch(clearError());
  },
});

export default connect(
  mapState,
  mapDispatch
)(Login);
