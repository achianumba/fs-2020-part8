const { UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { addUser, getUserByUsername } = require('./models/users');
const { JWT_SECRET } = require('./utils/config');

const pubsub = new PubSub();

const { 
  createAuthor,
  getAuthorByName,
  editAuthorBirthYear,
  updateBookCount
} = require('./models/authors');

const { createBook } = require('./models/books');

const addBook = async (root, args, context) => {
  if (!context.user) {
    throw new Error('Only logged in users may add a book to the library');
  }

  // to allow code outside the try/catch block access
  let bookAdded;

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

    await updateBookCount(author);
    
    bookAdded = book.toJSON();
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }

  pubsub.publish('BOOK_ADDED', { bookAdded })
  return bookAdded
};

const editAuthor = async (root, args, context) => {
  if (!context.user) {
    throw new AuthenticationError('Only logged in users may edit author details');
  }

  try {
    const updatedAuthor = await editAuthorBirthYear(args.name, args.setBornTo);
    return updatedAuthor.toJSON();
  } catch(err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }
};

const createUser = async (root, args) => {
  const password = await hash(args.password, 10);
  
  try {
    const user = await addUser({
      ...args,
      password
    });
    return user.toJSON();
  } catch(err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }
};

const login = async(root, args) => {
  const user = await getUserByUsername(args.username);
  
  if (!user) {
    throw new UserInputError('User not found', {
      invalidArgs: args
    });
  }

  try {
    const isCorrectPassword = await compare(args.password, user.password);
    
    if (!isCorrectPassword) {
      throw new AuthenticationError('You have entered an incorrect username or password');
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    return {
      value: sign(userForToken, JWT_SECRET),
      favoriteGenre: user.favoriteGenre
    }
  } catch(err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }
}

//Subscription to be added to resolver
const Subscription = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
  }
}

const Mutation = {
  addBook,
  editAuthor,
  createUser,
  login
}

module.exports = {
  Mutation,
  Subscription
}