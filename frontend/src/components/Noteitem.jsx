import React,{useContext} from "react";


// import 'boxicons';


const Noteitem = (props) => {
  const { note } = props;
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
    <div className="holder col-md-4 mt-4">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">
            {note.description}
          </p>
          <h6 className="card-subtitle mb-2 text-body-secondary">{timeAgo(inputTime)}</h6>
        <i className='bx bx-edit mx-2'></i>
        <i className='bx bx-trash'></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
