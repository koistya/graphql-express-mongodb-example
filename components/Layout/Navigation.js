import React, { Component, PropTypes } from 'react';
import Link from '../Link';

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
        <Link className="mdl-navigation__link" href="/">Home</Link>
        <Link className="mdl-navigation__link" href="/about">About Us</Link>
        <Link className="mdl-navigation__link" href="/not-found">Not Found</Link>
      </div>
    );
  }

}

export default Navigation;
