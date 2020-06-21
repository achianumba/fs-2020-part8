const { env } = process;
const { connect } = require('mongoose');

if (env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const MONGO_URI = env.NODE_ENV === 'production' ?
env.MONGO_URI : env.MONGO_URI_DEV;

const connectToMongoDB = () => {
    connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch(err => {
        console.error(err);
    });
}

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    connectToMongoDB,
    JWT_SECRET
};