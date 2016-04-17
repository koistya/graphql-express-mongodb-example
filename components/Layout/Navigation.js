import React, { Component, PropTypes } from 'react';

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
        <a className="mdl-navigation__link" href="#/">Home</a>
        <a className="mdl-navigation__link" href="#/about">About Us</a>
        <a className="mdl-navigation__link" href="#/not-found">Not Found</a>
      </div>
    );
  }

}

export default Navigation;
