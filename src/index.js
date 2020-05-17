/**
 *
 * Author:  AppSeed.us - Full Stack App Generator
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/rosoftdeveloper/appseed
 *
 */

const env = process.env.NODE_ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const { typeDefs, resolvers, schemaDirectives } = require('./graphql');
const models = require('./models');
const db = require('./db');

/* Make all variables from our .env file available in our process */
require('dotenv').config();

/* Init express */
const app = express();

/* Here we setup the middlewares & configs */

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
// require('./config/passport');

/* Here we define the api routes */
// app.use(require('./routes'));

const port = process.env.PORT || 4000;
const address = process.env.SERVER_ADDRESS || '127.0.0.1';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  introspection: true,
});

server.applyMiddleware({ app, cors: false });

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

/**
 * ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
 * Create everything automatically with sequelize ORM
 */
models.sequelize.sync().then(function() {
  db.CreateSeedData()
    .then(() => {
      return db.TestDbServices();
    })
    .then(() => {
      httpServer.listen(port, () => {
        let _port = '';
        let _address = address;
        let _protocol = 'https';
        if (env === 'development') {
          _port = `:${port}`;
          _address = '127.0.0.1';
          _protocol = 'http';
        }
        console.log(
          `Express Server running on ${_protocol}://${_address}${_port}`
        );
        console.log(
          `🚀 Apollo Server ready at ${_protocol}://${_address}${_port}${server.graphqlPath}`
        );
        console.log(
          `🚀 Subscriptions ready at ws:///${_address}${_port}${server.subscriptionsPath}`
        );
        console.log(
          `🚀 Serving the GraphQL Playground on ${_protocol}://${_address}${_port}/playground`
        );
      });
    })
    .catch(error => {
      console.log(error);
      console.log('Server failed to start....');
    });
});

module.exports = app;
