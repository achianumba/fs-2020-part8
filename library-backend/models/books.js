const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 2
    },
    published: {
      type: Number,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    },
    genres: [
      { type: String}
    ]
  });

  bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })

  const Book = model('Book', bookSchema);

  const getBooks = () => Book.find().populate('author', 'name');


  const getBooksByGenre = (genre) => Book.find({
    genres: genre
  });
  
  const getBooksByAuthorAndGenre = (genre, author) => {
    return Book.find({
      genres: genre,
      author
    });
  }

  const getBooksByAuthor = (author) => {
    return Book.find({ author });
  }

  const countBooksByAuthor = (id) => {
    return Book.countDocuments({ author: id });
  }

  const createBook = (book) => new Book(book).save();

  module.exports = {
    getBooks,
    getBooksByAuthorAndGenre,
    getBooksByAuthor,
    getBooksByGenre,
    countBooksByAuthor,
    createBook
  };