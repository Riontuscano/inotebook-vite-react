import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteState from '../context/notes/notecontext'
import NoteItem from './Noteitem'
import '../css/Notes.css';

const Notes = () => {
  const [formData, setFormData] = useState({
    id:"",
    title: "",
    description: "",
    tag: "personal",
  });

  const { notes, fetchNotes, editNote } = useContext(NoteState); // Assuming 'addNote' is defined in your context.

  useEffect(() => {
    fetchNotes();
  }, []);

  const ref = useRef(null);

  const updateNote = (note) => {
    ref.current.click();
    setFormData({
      id:note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    }); // Populate the form with the current note.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(formData.id,formData.title,formData.description,formData.tag); // Save changes or add the note.
  };

  return (
    <>
      {/* Hidden button to trigger the modal */}
      <button type="button" ref={ref} className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>

      {/* Modal for editing the note */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a description"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="Enter a tag"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes display */}
      <div className='row m-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} updateNote={() => updateNote(note)} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
