import React, { useState ,useContext} from "react";
import "../css/form.css";
import NoteContext from '../context/notes/notecontext'


const Form = (props) => {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "personal",
  });

  const handleClick = () =>{
     addNote(formData)
     props.showAlert("Note Created Successfully","success")
    }
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
    setFormData({ title: "", description: "", tag: "personal" });
  };
  const {addNote} = useContext(NoteContext)

  return (
    <div className="form-container">
      <h1>Add Note </h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={formData.title.length < 5 || formData.description.length < 5}>
          Save Note
        </button>
      </form>
    </div>
  );
};

export default Form;
