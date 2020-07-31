const Query = require('./queries');
const { Mutation, Subscription } = require('./mutations');
const Author = require('./authorResolver');

const resolvers = {
  Query,
  Author,
  Mutation,
  Subscription
};

module.exports = resolvers;