import React from 'react';
import ReactDOM from 'react-dom/server';
import Promise from 'bluebird';
import express from 'express';
import graphql from 'express-graphql';
import { MongoClient } from 'mongodb';
import Html from './components/Html';
import schema from './data/schema';

const app = express();
const port = process.env.PORT || 3000;

// Compiles client-side JavaScript code on the fly
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./tools/webpack.config').default;
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

// Register GraphQL middleware
// https://github.com/graphql/express-graphql
app.use('/graphql', graphql(req => ({
  schema,
  graphiql: true,
  rootValue: { db: req.app.locals.db }
})));

// Register Express.js route(s)
app.use('/test', require('./routes/test').default);

// Serve an empty HTML page for all requests (SPA)
app.get('*', (req, res) => {
  const markup = ReactDOM.renderToStaticMarkup(<Html />);
  res.send(`<!doctype html>\n${markup}`);
});

// Create a MonboDB connection pool and start the Node.js app
MongoClient.connect('mongodb://localhost:27017/demo', { promiseLibrary: Promise })
  .catch(err => console.error(err.stack))
  .then(db => {
    app.locals.db = db; // See http://expressjs.com/en/4x/api.html#app.locals
    app.listen(port, () => {
      console.log(`Node.js app is listening at http://localhost:${port}/`);
    });
  });
