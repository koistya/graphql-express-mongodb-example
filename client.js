import React from 'react';
import ReactDOM from 'react-dom';
import Layout  from './components/Layout/Layout';

const routes = {
  '/': <Layout><h1>Home Page</h1></Layout>,
  '/about': <Layout><h1>About Us</h1></Layout>,
  '/404': <Layout><h1>Not Found</h1></Layout>,
  '/error': <Layout><h1>Error</h1></Layout>
};

const container = document.getElementById('root');

function render() {
  try {
    const path = window.location.hash.substr(1) || '/';
    console.log(path);
    const component = routes[path] || routes['/404'];
    ReactDOM.render(component, container);
  } catch (err) {
    const component = routes['/error'];
    ReactDOM.render(component, container);
  }
}

window.addEventListener('hashchange', () => render());
render();
