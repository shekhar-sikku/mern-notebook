/* eslint-disable react/prop-types */
import { useEffect, useContext, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NotesContext from '../context/notes/NotesContext';
import NotesItem from './NotesItem';

export default function Notes({ showAlert }) {
    const context = useContext(NotesContext);
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            getNotes()
        }
        else {
            navigate("/login")
            showAlert("Login your id to get your notes.", "info")
        }
    })

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tag)
        showAlert("Note Updated Successfully", "info")
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* Fetch Notes via using NotesItem Components */}
            <div className="mx-5 px-5 min-vh-100">
                <div className="row my-5 px-5 justify-content-center">
                    <h1 className="mb-5 d-flex justify-content-center fw-bold">Your Notes</h1>
                    {notes.length === 0 && "No notes to display!"}
                    {notes.map((note, i) => {
                        return <NotesItem key={i} note={note} updateNote={updateNote} showAlert={showAlert} />
                    })}
                </div>
            </div>

            {/* Modal for Update Existing Note */}
            <div className="modal fade" id="update" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">iNotebook - Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-2">
                            <form className="m-2">
                                <div className="mb-2 px-2">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" placeholder="note title" onChange={onChange} value={note.title} />
                                </div>
                                <div className="mb-2 px-2">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" name="description" rows="4" placeholder="note description" onChange={onChange} value={note.description} />
                                </div>
                                <div className="mb-2 px-2">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" placeholder="note tag" onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Button for open modal */}
            <button type="button" ref={ref} className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#update" />
        </>
    )
}