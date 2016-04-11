# GraphQL Server Example

> A minimalistic GraphQL server example built with Node.js, Express, MongoDB
> Native Driver and ES2015+ async/await syntax via Babel. It demonstrates how to
> register a GraphQL middleware in Node.js/Express app, how to create a MongoDB
> connection pool and share it between Express routes, middleware functions and
> GraphQL "resolve" methods.

### Getting Started

```sh
$ npm install
$ npm start
```

* [http://localhost:3000/](http://localhost:3000/) — demo page that writes a record to the MongoDb database
* [http://localhost:3000/graphql?raw&query={log}](http://localhost:3000/graphql?raw&query={log}) — a GraphQL endpoint that lists db records

### Source Files

#### `package.json`

```json
{
  "private": true,
  "babel": {
    "presets": [
      "node5",
      "stage-0"
    ]
  },
  "dependencies": {
    "bluebird": "3.3.4",
    "express": "4.13.4",
    "graphql": "0.5.0",
    "mongodb": "2.1.16"
  },
  "devDependencies": {
    "babel-cli": "^6.7.5",
    "babel-preset-node5": "^11.0.1",
    "babel-preset-stage-0": "^6.5.0"
  },
  "scripts": {
    "start": "babel-node ./server.js"
  }
}
```

#### `server.js`

```js
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
```

#### `routes/home.js`

```js
import { Router } from 'express';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    await db.collection('log').insertOne({
      time: new Date(),
      ip: req.ip,
      message: 'Homepage visit'
    });
    res.send('<h1>Hello, world!</h1>');
  } catch (err) {
    next(err);
  }
});

export default router;
```

#### `data/schema.js`

```js
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

// A GraphQL schema
// https://github.com/graphql/graphql-js
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      log: {
        type: new GraphQLList(GraphQLString),
        async resolve({ db }, args) {
          var items = await db.collection('log').find().toArray();
          return items.map(x => `${x.time} ${x.ip} ${x.message}`);
        }
      }
    }
  })
});

export default schema;
```

### Related Projects

* [GraphQL.js](https://github.com/graphql/graphql-js) — A reference implementation of GraphQL for JavaScript
* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js, GraphQL, React)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015+, Babel)

### License

MIT (c) Konstantin Tarkus ([@koistya](https://twitter.com/koistya))
