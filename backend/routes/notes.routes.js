const express = require("express");
const router = express.Router();
const notesModel = require("../schemas/notes.model");

const middleware = require("../middleware/userverifecation");
const upload = require('../middleware/multer')
router.post("/addnotes", middleware, upload.single('image'), async (req, res) => {
try {
  const { title, description, tag } = req.body;
  // console.log(title, description, tag, req.user);
  // console.log(req.file)
  let user;
  if(req.file){
    user = await notesModel.create({
      title: title,
      description: description,
      tag: tag,
      image:req.file.filename,
      createdby: req.user,
    });
  }
  else{
    user = await notesModel.create({
      title: title,
      description: description,
      tag: tag,
      createdby: req.user,
    });
  }

  res.status(200).json({
    success: true,
    message: "Note Added Successfully",
    usernotes: user,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:error
  })
}
 
});


// router.post("/addnotes", middleware, async (req, res) => {
//   try {
//     const { title, description, tag } = req.body;
//     console.log(req.body, req.user);
//     let user = await notesModel.create({
//       title: title,
//       description: description,
//       tag: tag,
//       createdby: req.user,
//     });
//     res.status(200).json({
//       success: true,
//       message: "Note Added Successfully",
//       usernotes: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error,
//     });
//   }
// });

router.get("/getnotes", middleware, async (req, res) => {
  console.log(req.user);
  try {
    let allNotes = await notesModel.find({ createdby: req.user });
    res.status(200).json({
      success: true,
      message: "Your notes",
      notes: allNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

router.put("/updatenotes/:id", async (req, res) => {
  let { title, description, tag } = req.body;
  let newNotes = {};
  if (title) {
    newNotes.title = title;
  }
  if (description) {
    newNotes.description = description;
  }
  if (tag) {
    newNotes.tag = tag;
  }
  console.log(newNotes);
  try {
    const notes = await notesModel.findByIdAndUpdate(req.params.id, {
      $set: newNotes,
    });
    res.status(200).json({
      success: true,
      message: "Notes Updated Successfully",
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

router.delete("/deletenotes/:id", middleware, async (req, res) => {
  console.log(req.params);
  try {
    let deleteNotes = await notesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Notes Deleted Successfull",
      deleteNotes: deleteNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

module.exports = router;
