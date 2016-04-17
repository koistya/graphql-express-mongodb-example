import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <div className="mdl-navigation" ref={node => this.root = node}>
        <Link className="mdl-navigation__link" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/about">About Us</Link>
        <Link className="mdl-navigation__link" to="/not-found">Not Found</Link>
      </div>
    );
  }

}

export default Navigation;
