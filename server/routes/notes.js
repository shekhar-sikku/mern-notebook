import { Router } from 'express';
import fetchuser from '../middleware/fetchuser.js';
import { Note } from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
const noteRouter = Router();

// ROUTE 1 - Get user notes using GET:"/api/notes/fetchAllNotes"
noteRouter.get("/fetchNotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status((500).send("Internal Server Error!"));
    }
});

// ROUTE 2 - Add new note using POST:"/api/notes/addNote"
noteRouter.post("/addNote", fetchuser, [
    body("title", "Enter a valid title.").isLength({ min: 5 }),
    body("description", "Description must be at least 5 characters.").isLength({
        min: 10,
    }),
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.log(error.message);
            res.status((500).send("Internal Server Error!"));
        }
    }
);

// ROUTE 3 - Update existing note using PUT:"/api/notes/updateNote"
noteRouter.put("/updateNote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status((500).send("Internal Server Error!"));
    }
});

// ROUTE 4 - Delete note using DELETE:"/api/notes/updateNote"
noteRouter.delete("/deleteNote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted.", note: note });
    } catch (error) {
        console.log(error.message);
        res.status((500).send("Internal Server Error!"));
    }
});

export default noteRouter;