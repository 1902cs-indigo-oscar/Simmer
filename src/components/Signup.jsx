import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, clearError } from '../store';

class Signup extends Component {
  state = {
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        inputType: 'input',
        fasType: 'fas fa-user',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        inputType: 'input',
        fasType: 'fas fa-user',
      },
      {
        name: 'email',
        label: 'Email Address',
        inputType: 'email',
        fasType: 'fas fa-envelope',
      },
      {
        name: 'password',
        label: 'Password',
        inputType: 'password',
        fasType: 'fas fa-key',
      },
    ],
  };

  componentDidMount() {
    this.props.resetError();
  }

  renderInputFields(name, label, inputType, fasType, i) {
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
                type={inputType}
                placeholder={label}
                name={name}
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
            <h1 className="title has-text-weight-semibold">Sign Up</h1>
            <div className="columns is-centered">
              <div className="column is-half">
                <form className="" onSubmit={handleSubmit} name={name}>
                  {fields.map(({ name, label, inputType, fasType }, i) => {
                    return this.renderInputFields(
                      name,
                      label,
                      inputType,
                      fasType,
                      i
                    );
                  })}
                  <br />
                  <button className="button is-danger" type="submit">
                    Submit
                  </button>
                  {error && error.response && (
                    <div>
                      <br />
                      Please enter all fields with valid information.
                    </div>
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
  name: 'signup',
  error: state.user.error,
});

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const { history } = ownProps;
    dispatch(auth(email, password, formName, firstName, lastName, history));
  },
  resetError() {
    dispatch(clearError());
  },
});

export default connect(
  mapState,
  mapDispatch
)(Signup);
