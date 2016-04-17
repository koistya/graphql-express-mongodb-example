import React, { Component, PropTypes } from 'react';
import Header from './Header';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout" ref={node => this.root = node}>
        <Header />
        <main className="mdl-layout__content">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }

}

export default Layout;
