import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation';

class Header extends Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className="mdl-layout__header" ref={node => this.root = node}>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Web App Example</span>
          <div className="mdl-layout-spacer"></div>
          <Navigation />
        </div>
      </header>
    );
  }

}

export default Header;
