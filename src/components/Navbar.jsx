/* eslint-disable jsx-a11y/anchor-is-valid */
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
        className="navbar is-fixed-top is-black"
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
          <a
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            role="button"
            data-target="navbarMenu"
            onClick={this.handleClick}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navbarMenu"
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className="navbar-end">
            <Link className="navbar-item has-text-danger" to="/login">
              Log In
            </Link>
            <Link className="navbar-item has-text-danger" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
        <style jsx="">{`
          .navbar-item {
            font-family: 'Aclonica';
          }
        `}</style>
      </nav>
    );
  }
}

export default Navbar;
