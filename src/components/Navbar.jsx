import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    isActive: false,
  };

  handleClick = event => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const { isActive } = this.state;
    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="navbar-brand">
          <Link
            className="navbar-item is-logo has-text-danger has-text-weight-bold is-size-4"
            to="/"
          >
            Simmer
          </Link>
          <Link
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            role="button"
            to="/"
            data-target="navbarMenu"
            onClick={this.handleClick}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </Link>
        </div>
        <div
          id="navbarMenu"
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className="navbar-end">
            <Link className="navbar-item" to="/login">
              Log In
            </Link>
            <Link className="navbar-item" to="/signup">
              Register
            </Link>
          </div>
        </div>
        <style jsx>{`
          .navbar-item {
            font-family: 'Aclonica';
          }
        `}</style>
      </nav>
    );
  }
}

export default Navbar;
