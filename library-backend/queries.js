const { 
    getBooks,
    getBooksByAuthor,
    getBooksByGenre,
    getBooksByAuthorAndGenre
} = require('./models/books');

const { 
    getAuthors,
    countAuthors
} = require('./models/authors');

const allBooks = async (root, args) => {
    //Return only books of the given genre and author
    if (args.genre && args.author) {
        return getBooksByAuthorAndGenre(args.genre, args.author);
    }
    //Return only books of the given genre
    if (args.genre) {
      return getBooksByGenre(args.genre);
    }

    //Return only books of the given author
    if (args.author) {
      return getBooksByAuthor(args.author);
    }

    return getBooks();
};

const me = async (root, args, context) => {
    return context.user
};

const Query = {
    allBooks,
    allAuthors: async () => getAuthors(),
    authorCount: () => countAuthors(),
    me
};

module.exports = Query;