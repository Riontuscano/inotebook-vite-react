import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="holder col-md-4">
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p class="card-text">
            {note.description}
          </p>
          <h6 class="card-subtitle mb-2 text-body-secondary">{note.timeStamp}</h6>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
