
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');


router.get('/notes', (req, res) => {
    res.json(notes);
});


router.post('/notes', (req, res) => {
    
    req.body.id = uniqid();

    
    if (!req.body.title || !req.body.text) {
        res.status(404).send('Please enter title and text.');
    } else {
        const note = req.body;

        notes.push(note);

        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes: notes }, null, 2)
        );

        res.json(notes);
    }
});


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


module.exports = router;