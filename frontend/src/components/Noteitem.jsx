import React, { useContext } from "react";
import NoteState from '../context/notes/notecontext'

// import 'boxicons';


const Noteitem = (props) => {
  const context = useContext(NoteState);
  const { confirmDelete,deleteNote ,fetchOneNote } = context;
  const { note, updateNote } = props;
  const inputTime = new Date(note.timeStamp);


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
  }


  return (
    <>
    <div className="holder col-md-4 mt-4">
      <div className="modal fade" id="exampleModalNoteItem" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Deletion Alert!!</h1>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
              Are you sure you want to delete this note , Once deleted will not be recoverable 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => confirmDelete(false)}>Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => confirmDelete(true)}>
              Yes,I do</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">
            {note.description}
          </p>
          <h6 className="card-subtitle mb-2 text-body-secondary">{timeAgo(inputTime)}</h6>
          <i className='bx bx-edit mx-2' onClick={() => {fetchOneNote(note._id); updateNote(note._id)}}></i>
          <i className='bx bx-trash'  onClick={()=>{deleteNote(note._id)}}></i>
          {/* data-bs-toggle="modal" data-bs-target="#exampleModalNoteItem" */}
        </div>
      </div>
    </div>
    </>
  );
};

export default Noteitem;
