import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5500";
  const noteinitial = []
  const [notes, setNotes] = useState(noteinitial);
  const [nude, setNude ]= useState({
    title: "",
    description: "",
    tag: "personal",
  })

  // Fetch all notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":localStorage.getItem("authtoken"),
      },
    })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
     const json = await response.json();
     setNotes(json)
     
  }
  const fetchOneNote = async (updateId) => {
    const response = await fetch(`${host}/api/notes/fetchnote/${updateId}`, {
      method: "GET",
      headers: {
        "auth-token":localStorage.getItem("authtoken"),
        },
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          });
          const json = await response.json();
          setNude(json)
          }
  // Add a note
  const addNote = async (formData) => {
    //for server
    const response = await fetch(`${host}/api/notes/addnewnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("authtoken"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response.json());
        
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });

     
    //for client
    const note = await response.json()
    
    setNotes(noteinitial.concat(note));
    fetchNotes()
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // for server
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({title,description,tag}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });

    // for client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  //Delete a note
  const deleteNote = async (noteId) => {
    const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("authtoken"),
      },
    })
      .catch((error) => {
        console.error("Error creating post:", error);
      }); 
      fetchNotes()
    }
  return (
    <NoteContext.Provider value={{ nude,notes, addNote, editNote, deleteNote,fetchNotes,fetchOneNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;