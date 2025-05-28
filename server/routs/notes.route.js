import Router from 'express'
import { addNotes, deleteNote, editNotes, getAllNotes, updatePin,searchNotes } from '../controllers/notes.controller.js';
import { authenticateToken } from '../utilities.js';

const notesRoute = new Router()

notesRoute.post('/add-note',authenticateToken,addNotes)
notesRoute.put('/edit/:noteId',authenticateToken,editNotes)
notesRoute.delete('/delete/:noteId',authenticateToken,deleteNote)
notesRoute.put('/update-pin/:noteId',authenticateToken,updatePin)
notesRoute.get('/get-notes',authenticateToken,getAllNotes)
notesRoute.get('/search/',authenticateToken,searchNotes)

export default notesRoute;