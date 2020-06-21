const { UserInputError } = require('apollo-server');

const { 
  createAuthor,
  getAuthorByName,
  editAuthorBirthYear
} = require('./models/authors');

const { createBook } = require('./models/books');

const addBook = async (root, args) => {
  try {
    //check if  author exists
    let author = await (await getAuthorByName(args.author));
    //create author if inexistent
    if (!author) {
      author = await createAuthor({
        name: args.author
      });
    }

    // add book to db
    const book = await createBook({
      ...args,
      author: author._id
    });

    return book.toJSON();
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }
};

const editAuthor = async (root, args) => {
  try {
    const updatedAuthor = await editAuthorBirthYear(args.name, args.setBornTo);
    return updatedAuthor.toJSON();
  } catch(err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }
};

const Mutation = {
  addBook,
  editAuthor
}

module.exports = Mutation;