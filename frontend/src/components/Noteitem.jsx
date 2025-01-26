import React, { useContext, useState } from "react";
import NoteState from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context = useContext(NoteState);
  const { deleteNote, fetchOneNote } = context;
  const { note, updateNote , showAlert } = props;
  const inputTime = new Date(note.timeStamp);

  // State to manage which note is selected for deletion
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const timeAgo = (date) => {
    const now = new Date();
    const differenceInMs = now - date;

    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) return `few seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return `${weeks} weeks ago`;
  };

  const handleDelete = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId); // Delete the selected note
      showAlert("Note Deleted Successfully","success")
      setSelectedNoteId(null); // Clear the selected note ID after deletion
    }
  };

  return (
    <>
      <div className="holder col-md-4 mt-4">
        {/* Modal */}
        <div
          className="modal fade"
          id={`modal-${note._id}`} // Unique ID for each modal
          tabIndex="-1"
          aria-labelledby={`modal-label-${note._id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`modal-label-${note._id}`}>
                  Deletion Alert!!
                </h1>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this note? Once deleted, it will not be recoverable.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setSelectedNoteId(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Yes, I do
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Note Card */}
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
            <p className="card-text">{note.description}</p>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {timeAgo(inputTime)}
            </h6>
            <i
              className="bx bx-edit mx-2"
              onClick={() => {
                fetchOneNote(note._id);
                updateNote(note._id);
              }}
            ></i>
            <i
              className="bx bx-trash"
              data-bs-toggle="modal"
              data-bs-target={`#modal-${note._id}`} 
              onClick={(e) => {
                e.stopPropagation(); 
                setSelectedNoteId(note._id); 
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
