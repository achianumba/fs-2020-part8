const { ApolloServer } = require("apollo-server");
const { verify } = require('jsonwebtoken');
const resolvers = require('./resolvers');
const typeDefs = require('./types');
const { connectToMongoDB, JWT_SECRET } = require('./utils/config')
const { getUserByUserId } = require('./models/users');

connectToMongoDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const token = await verify(auth.slice(7), JWT_SECRET);
      const user = await getUserByUserId(token.id);
      return {
        user: user.toJSON()
      }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});