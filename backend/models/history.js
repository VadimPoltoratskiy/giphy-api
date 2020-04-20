const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    searchText: {
        type: String,
        required: true
    }
}
);

module.exports = mongoose.model('History', historySchema);