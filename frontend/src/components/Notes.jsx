import React ,{useContext} from 'react'
import NoteState from '../context/notes/notecontext'
import NoteItem from './Noteitem'
import '../css/Notes.css';

const Notes = () => {
    const {notes ,setNotes} = useContext(NoteState)
  return (
    <div className='row m-3'>
  <h2>Your Notes</h2>
  {notes.map((note)=>{
    return <NoteItem key={note._id} note = {note}/>

  })}
    </div>
  )
}

export default Notes
