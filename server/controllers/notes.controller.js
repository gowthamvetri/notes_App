import notesModel from "../models/notes.model.js";

export async function addNotes(req, res) {
  const user = req.user.userId;
  const { title, content, tags } = req.body;

  if (!title) {
    return res.status(401).json({
      message: "Provide the title",
      error: true,
    });
  }
  if (!content) {
    return res.status(401).json({
      message: "Provide the content",
      error: true,
    });
  }

  try {
    console.log(user);
    const newNote = new notesModel({
      title,
      content,
      tags: tags || [],
      userId: user,
    });

    await newNote.save();

    return res.json({
      message: "Notes Added Successfully",
      error: false,
      notes: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

export async function editNotes(req, res) {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user.userId;

  if (!title && !content && !tags) {
    return res.status(400).json({
      message: "No changes Provided",
      error: true,
    });
  }

  try {
    const srchuser = await notesModel.findOne({ _id: noteId, userId: user });
    if (!srchuser) {
      return res.status(400).json({
        message: "Not a valid user id or note id",
        error: true,
      });
    }

    if (title) srchuser.title = title;
    if (content) srchuser.content = content;
    if (tags) srchuser.tags = tags;
    if (isPinned) srchuser.isPinned = isPinned;

    await srchuser.save();

    return res.json({
      message: "Editted successfully",
      error: false,
      notes: srchuser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

export async function getAllNotes(req, res) {
  const user = req.user.userId;

  try {
    const notes = await notesModel.find({ userId: user }).sort({ isPinned: -1 });
    return res.json({
      message: "Notes Retrived Successfully",
      error: false,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

export async function deleteNote(req, res) {
  const noteId = req.params.noteId;
  const user = req.user;
  try {
    const note = await notesModel.findOne({ _id: noteId, userId: user.userId });
    if (!note) {
      return res.status(400).json({
        message: "Note not found",
        error: true,
      });
    }

    await notesModel.deleteOne({ _id: noteId, userId: user.userId });

    return res.json({
      message: "Note Removed Successfully",
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

export async function updatePin(req, res) {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const user  = req.user.userId;

  try {
    const note = await notesModel.findOne({ _id: noteId, userId: user });
    console.log(note);
    if (!note) {
      return res.status(400).json({
        message: "Note not found",
        error: true,
      });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({
      message: "Pin Updated successfully",
      error: false,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function searchNotes(req, res) {
  const user = req.user.userId;
  const search = req.query;
  console.log(search);
  if (!search) {
    return res.status(400).json({
      message: "Provide a search query",
      error: true,
    });
  }

  try {
    const notes = await notesModel.find({
      userId: user,
      $or: [
        {title: { $regex: search.query, $options: "i" }},
        {content: { $regex: search.query, $options: "i" }}
      ],
    });
    console.log(notes);
    return res.json({
      message: "Notes Retrived Successfully",
      error: false,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}
