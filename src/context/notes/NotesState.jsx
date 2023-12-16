/* eslint-disable react/prop-types */
import { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
    const apiUrl = 'http://localhost:5100/api/notes';
    let notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const deleteNote = async (id) => {
        const response = await fetch((`${apiUrl}/deleteNote/${id}`), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth_jwt': localStorage.getItem('auth_token')
            },
            body: JSON.stringify()
        })
        const json = await response.json();
        console.log(`Note of id ${id} deleted successfully!\n`, json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }


    const getNotes = async () => {
        const response = await fetch((`${apiUrl}/fetchNotes`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_jwt': localStorage.getItem('auth_token')
            },
            body: JSON.stringify()
        })
        const json = await response.json();
        setNotes(json)
    }


    const addNote = async (title, description, tag) => {
        const response = await fetch((`${apiUrl}/addNote`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_jwt': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        setNotes(notes.concat(json))

        console.log('Adding new note.')
        console.log(`Note added successfully!\n`, json)
    }


    const editNote = async (id, title, description, tag) => {
        const response = await fetch((`${apiUrl}/updateNote/${id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_jwt': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.teg = tag;
            }
        }
        console.log(`Note of ${id} edited!\n`, json);
    }


    return (
        <NotesContext.Provider value={{ notes, setNotes, deleteNote, addNote, getNotes, editNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState;
