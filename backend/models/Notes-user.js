import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"All"
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }

});

const notes = mongoose.models.Notes || mongoose.model('Notes', NotesSchema);

export default notes;