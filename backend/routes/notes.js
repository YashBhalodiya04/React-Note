const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { validationResult, body } = require("express-validator");

// Route 1: Add notes using : POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter the title of note").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charactrrs").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // destructure the Note
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create a new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();

      res.json(savenote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Enternal Server Error");
    }
  }
);

// Route 2: Get all data of user using : GET "/api/notes/fetchalldata". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Enternal Server Error");
  }
});

// Route 3: Update exiting note using : PUT "/api/notes/updatenote". Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // create new note object
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

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Enternal Server Error");
  }
});

// Route 4: Delete exiting note using : DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
    
  // Find the note to be delete and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Note Found");
  }

  // Check user validation for deletion
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ Success: "Note has been deleted" });

} catch (error) {
  console.error(error);
  res.status(500).send("Enternal Server Error");
}
});

module.exports = router;