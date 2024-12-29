import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const [count, setCount] = useState(0);
   const noteinitial = [
    {
      "_id": "676018e5b360412c3467d948",
      "user": "675ed975603e70b029f300f5",
      "title": "New note",
      "description": "second note ",
      "tag": "personal",
      "timeStamp": "2024-12-16T12:11:17.246Z",
      "__v": 0
    },
    {
      "_id": "6761770fb40776bfac087162",
      "user": "675ed975603e70b029f300f5",
      "title": "My third push updated ",
      "description": "Hello my name is rion updated with out hello",
      "tag": "personal",
      "timeStamp": "2024-12-17T13:05:19.599Z",
      "__v": 0
    },
    {
      "_id": "67617764d312e3b91fc95def",
      "user": "675ed975603e70b029f300f5",
      "title": "My third push ",
      "description": "Hello my name is rion",
      "tag": "personal",
      "timeStamp": "2024-12-17T13:06:44.650Z",
      "__v": 0
    },
    {
      "_id": "676fda813d96d6085220185e",
      "user": "675ed975603e70b029f300f5",
      "title": "My 4th push ",
      "description": "Hello my name is rion for the 4th time",
      "tag": "public",
      "timeStamp": "2024-12-28T11:01:21.744Z",
      "__v": 0
    }
  ]
  // Add a note 
const addNote = (formData) =>{

const currentDate = new Date();
const isoDate = currentDate.toISOString();

  
  setCount((prevCount) => prevCount + 1);
  const note = {
    "_id": `676fda813d96d6085220185e${count}`,
    "user": "675ed975603e70b029f300f5",
    "title": formData.title,
    "description": formData.description,
    "tag": formData.tag,
    "timeStamp": isoDate,
    "__v": 0
  }

  setNotes(noteinitial.concat(note))

}
  //Edit a note
const editNote = () =>{
  
}
  //Delete a note
  const deleteNote = () =>{
  
  }     
    const [notes, setNotes] = useState(noteinitial);
return(
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote}}>
        {props.children}
    </NoteContext.Provider>
)}
export default NoteState;