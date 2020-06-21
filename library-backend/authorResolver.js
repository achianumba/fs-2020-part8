const { countBooksByAuthor } = require('./models/books');
const Author = {
    bookCount: async (root) => {
      const count = await countBooksByAuthor(root.id);
      return count;
    },
  };

  module.exports = Author;