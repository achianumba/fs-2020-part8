const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 2
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete password;
    }
});

const User = model('User', userSchema);

const getUserByUsername = (username) => {
    return User.findOne({ username });
}

const getUserByUserId = (id) => {
    return User.findById(id);
}

module.exports = {
    getUserByUsername,
    getUserByUserId
}