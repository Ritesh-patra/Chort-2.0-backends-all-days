const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    dis:{ type: String, required: true }
})

const NoteModel = mongoose.model('note', noteSchema);

module.exports = NoteModel;