require('dotenv').config();
const express = require('express');
const NoteModel = require('./config/models/note.model');
const app = express();
const cors = require('cors');

//access public folder
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Post Method
app.post('/notes', async (req, res) => {
    const {title, dis} = req.body;
    const notes = await NoteModel.create({
        title,
        dis
    })
    res.status(201).json({
        message: 'Note created successfully',
        notes
    })
})

//get Method
app.get('/notes', async (req, res) => {
    const notes = await NoteModel.find();
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    })
})

//delete Method
app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;
    await NoteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Note deleted successfully'
    })
})

//update Method
app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const {dis} = req.body;
    await NoteModel.findByIdAndUpdate(id, {dis});
    res.status(200).json({
        message: 'Note updated successfully'
    })
})

module.exports = app;