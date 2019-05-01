import React, { Component } from 'react';

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

  handleSubmit = event => {
    event.preventDefault();
  };

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
    return (
      <div>
        <section className="hero is-fullheight-with-navbar has-background-primary has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-weight-semibold">Sign Up</h1>
              <div className="columns is-centered">
                <div className="column is-half">
                  <form className="" onSubmit={this.handleSubmit}>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <style jsx="">{`
          * {
            font-family: 'Aclonica';
          }
        `}</style>
      </div>
    );
  }
}

export default Signup;
