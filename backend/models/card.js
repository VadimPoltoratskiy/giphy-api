const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    like: {
        type: Boolean,
        required: false
    }

}
);

module.exports = mongoose.model('Card', cardSchema);