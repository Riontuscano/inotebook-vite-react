import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteState from '../context/notes/notecontext'
import NoteItem from './Noteitem'

const Notes = (props) => {
  const [formData, setFormData] = useState({
    id:"",
    title: "",
    description: "",
    tag: "personal",
  });

  const { notes, fetchNotes, editNote } = useContext(NoteState); 

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
    }); 
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
    props.showAlert("Note Updated Successfully","success")
    editNote(formData.id,formData.title,formData.description,formData.tag); 
  };

  return (
    <>
      <button type="button" ref={ref} className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
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
                <button disabled={formData.title.length < 5 || formData.description.length < 5} type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row m-3'>
        <h2>Your Notes</h2>
        {notes.length === 0 && <h2>No notes yet! Create one above.😘 </h2>}
        {notes.map((note) => (
          <NoteItem key={note._id} updateNote={() => updateNote(note)} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
