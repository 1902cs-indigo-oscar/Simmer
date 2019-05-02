import React, { Component } from 'react';

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
    const { fields } = this.state;
    return (
      <div>
        <section className="hero is-fullheight-with-navbar has-background-primary has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-weight-semibold">Log In</h1>
              <div className="columns is-centered">
                <div className="column is-half">
                  <form className="" onSubmit={this.handleSubmit}>
                    {fields.map(({ name, label, fasType }, i) => {
                      return this.renderInputFields(name, label, fasType, i);
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

export default Login;