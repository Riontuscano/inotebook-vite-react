import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes-user.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/addnewnotes', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, tag } = req.body;

  try {

    const newNote = new Notes({
      user: req.user.id,  
      title,
      description,
      tag
    });

    const savedNote = await newNote.save();
    let notes = await Notes.findOne({ user: req.user.id });

    res.status(201).json({ message: "Note added successfully", note: notes });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
  
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/fetchnote/:id', fetchuser, async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Notes.findById(noteId).select("-password");
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
      }
      res.json(note);
      } catch (error) {
        console.error("Error fetching note:", error.message);
        res.status(500).send("Internal Server Error");
        }
        });

router.put('/updatenote/:id',fetchuser,[
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
  const {title,description,tag} = req.body;

  const newnode = {}

  if(title){newnode.title = title}
  if(description){newnode.description = description}
  if(tag){newnode.tag = tag}

  //find the note

  let note = await Notes.findById(req.params.id)

  if(!note){
    return res.status(404).send("Note not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not authorized")
  }

  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnode},{new:true})

  res.status(200).json({note})

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
})

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
  //find the note

  let note = await Notes.findById(req.params.id)

  if(!note){
    return res.status(404).send("Note not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not authorized")
  }

  note = await Notes.findByIdAndDelete(req.params.id)

  res.status(200).json({"Success":"Note has been deleted"})

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
})

export default router;
