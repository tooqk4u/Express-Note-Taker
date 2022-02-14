// Require dependencies
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

// GET /api/notes and return all saved notes as json
router.get('/notes', (req, res) => {
    res.json(notes);
});

// POST /api/notes get a new note that saves on request and returns new note to client
router.post('/notes', (req, res) => {
    // id set 
    req.body.id = uniqid();

    // Validate
    if (!req.body.title || !req.body.text) {
        return false
    } else {
        const newNote = req.body;

        notes.push(newNote);

        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes: notes }, null, 2)
        );

        res.json(notes);
    }
});

// Delete /api/note using id to select note to be deleted
router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
            
            fs.writeFileSync(
                path.join(__dirname, '../../db/db.json'),
                JSON.stringify({ notes: notes }, null, 2)
            );

            res.json(notes)
            
            return;
        }
    }
});

// Export router
module.exports = router;