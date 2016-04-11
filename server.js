import Promise from 'bluebird';
import express from 'express';
import graphql from 'express-graphql';
import { MongoClient } from 'mongodb';
import schema from './data/schema';
import homeRoute from './routes/home';

const app = express();
const port = process.env.PORT || 3000;

// Register GraphQL middleware
// https://github.com/graphql/express-graphql
app.use('/graphql', graphql(req => ({
  schema,
  graphiql: true,
  rootValue: { db: req.app.locals.db }
})));

// Register Express.js route(s)
app.use('/', homeRoute);

// Create a MonboDB connection pool and start the Node.js app
MongoClient.connect('mongodb://localhost:27017/demo', { promiseLibrary: Promise })
  .catch(err => console.error(err.stack))
  .then(db => {
    app.locals.db = db; // See http://expressjs.com/en/4x/api.html#app.locals
    app.listen(port, () => {
      console.log(`Node.js app is listening at http://localhost:${port}/`);
    });
  });
