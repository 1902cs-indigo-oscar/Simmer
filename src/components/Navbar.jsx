/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

class Navbar extends Component {
  state = {
    isActive: false,
  };

  handleHomeClick = event => {
    this.setState({ isActive: false });
  }

  handleMobileClick = event => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const { isActive } = this.state;
    const { isLoggedIn, handleClick } = this.props;
    return (
      <div>
        <nav
          className="navbar is-fixed-top is-black"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="navbar-brand">
            <Link
              className="navbar-item is-logo has-text-danger has-text-weight-bold is-size-4"
              to="/" onClick={this.handleHomeClick}
            >
              Simmer
            </Link>
            <a
              className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              role="button"
              data-target="navbarMenu"
              onClick={this.handleMobileClick}
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
            {isLoggedIn ? (
              <div className="navbar-end">
                <Link className="navbar-item has-text-danger" to="/home" onClick={this.handleMobileClick}>
                  Home
                </Link>
                <Link className="navbar-item has-text-danger" to="/search" onClick={this.handleMobileClick}>
                  Search
                </Link>
                <Link
                  className="navbar-item has-text-danger"
                  to="/recommendations" onClick={this.handleMobileClick}
                >
                  Recommendations
                </Link>
                <Link
                  className="navbar-item has-text-danger"
                  to="/"
                  onClick={handleClick}
                >
                  Log Out
                </Link>
              </div>
            ) : (
              <div className="navbar-end">
                <Link className="navbar-item has-text-danger" to="/login" onClick={this.handleMobileClick}>
                  Log In
                </Link>
                <Link className="navbar-item has-text-danger" to="/signup" onClick={this.handleMobileClick}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

export default connect(
  mapState,
  mapDispatch
)(Navbar);
