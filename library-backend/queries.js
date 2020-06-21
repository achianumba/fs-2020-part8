const { 
    getBooks,
    getBooksByAuthor,
    getBooksByGenre,
    getBooksByAuthorAndGenre,
    countBooks
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

const Query = {
    allBooks,
    allAuthors: async () => getAuthors(),
    bookCount: async () => countBooks(),
    authorCount: () => countAuthors()
};

module.exports = Query;