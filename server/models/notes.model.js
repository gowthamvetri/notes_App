import mongoose from "mongoose";

const NotesSchema = mongoose.Schema({
    userId : {
        type: String,
        required : true
    },
    title:{
        type:String,
        required : [true,"Provide the title field"]
    },
    content:{
        type:String,
        required : [true,"Provide the notes field"]
    },
    tags:{
        type : [String],
        default : []
    },
    isPinned : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const notesModel = mongoose.model('notes',NotesSchema);

export default notesModel;