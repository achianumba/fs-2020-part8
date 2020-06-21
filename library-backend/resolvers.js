const Query = require('./queries');
const Mutation = require('./mutations');
const Author = require('./authorResolver');

const resolvers = {
  Query,
  Author,
  Mutation
};

module.exports = resolvers;