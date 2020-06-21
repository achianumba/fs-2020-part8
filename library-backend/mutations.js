const { UserInputError } = require('apollo-server');
const { hash, compare } = require('bcrypt');
const { sign, decode } = require('jsonwebtoken');
const { addUser, getUserByUsername } = require('./models/users');
const { JWT_SECRET } = require('./utils/config');

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

const createUser = async (root, args) => {
  const password = await hash(args.password, 10);
  
  try {
    const user = await addUser({
      ...args,
      password
    });

    console.log(user.toJSON());
  } catch(err) {
    console.error(err);
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
      throw new Error('You have entered an incorrect username or password');
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    return {
      value: sign(userForToken, JWT_SECRET)
    }
  } catch(err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    });
  }
}

const Mutation = {
  addBook,
  editAuthor,
  createUser,
  login
}

module.exports = Mutation;