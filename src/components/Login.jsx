import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
  };

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
    const { fields } = this.props;
    return (
      <div className="container is-fullhd">
        <div className="box has-background-primary has-text-centered">
          <h1 className="title">Log In</h1>
          <form className="" onSubmit={this.handleSubmit}>
            <div className="columns is-centered">
              <div className="column is-half">
                {fields.map(({ name, label, fasType }, i) => {
                  return this.renderInputFields(name, label, fasType, i);
                })}
              </div>
            </div>
            <button className="button is-danger" type="submit">
              Submit
            </button>
          </form>
        </div>
        <style jsx="">{`
          * {
            font-family: 'Aclonica';
          }
        `}</style>
      </div>
    );
  }
}

const mapState = state => ({
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
});

export default connect(mapState)(Login);
