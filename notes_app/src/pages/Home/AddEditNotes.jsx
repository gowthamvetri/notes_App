import React, { useState } from "react";
import AddTag from "../../components/Input/AddTag";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

function AddEditNotes({ noteData, type, onClose, getAllNotes,showTostMsg }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState("");

  const editNote = async () => {
    const noteId = noteData._id
    try {
      const response = await axiosInstance.put("/api/notes/edit/"+noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.notes) {
        showTostMsg("Note Updated Successfully")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const addNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.notes) {
        showTostMsg("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleNote = () => {
    if (!title) {
      setError("Please provide me the Title");
      exit(1);
    }
    if (!content) {
      setError("Please Provide me the Content");
      exit(1);
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-700 hover:text-slate-950 rounded-md absolute right-1 top-1 cursor-pointer"
        onClick={onClose}
      >
        <MdClose className="text-2xl" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to Gym"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="content"
          rows={10}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <AddTag tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-3 p-3 "
        onClick={handleNote}
      >
        {type === "edit" ? "UPDATE" :"ADD"}
      </button>
    </div>
  );
}

export default AddEditNotes;
