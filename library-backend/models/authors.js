const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
});

authorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Author = model('Author', authorSchema);

const getAuthors = () => Author.find();
const getAuthorByName = (name) => Author.findOne({ name: name });

const editAuthorBirthYear = (name, born) => {
  return Author.findOneAndUpdate(
    { name },
    { $set: { born }},
    { new: true }
    );
}

const countAuthors = () => Author.countDocuments({});
const createAuthor = (author) => new Author(author).save();

module.exports = {
  getAuthors,
  getAuthorByName,
  countAuthors,
  createAuthor,
  editAuthorBirthYear
}