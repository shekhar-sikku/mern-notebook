/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import NotesContext from '../context/notes/NotesContext';
import { useNavigate } from "react-router-dom";

export default function AddNote({ showAlert }) {
    const context = useContext(NotesContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (localStorage.getItem('auth_token')) {
            addNote(note.title, note.description, note.tag);
            showAlert("Note Added Successfully!", "info");
            setNote({ title: "", description: "", tag: "" });
        }
        else {
            navigate('/login');
            showAlert("Please, login first to iNotebook for add notes", "warning");
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-5">
            <h1 className="my-5 text-center fw-bold">iNotebook - Your Cloud Notebook</h1>
            <form className="mx-5 px-5">
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Note Title" onChange={onChange} value={note.title} autoComplete='off' />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="5" placeholder="Note Description" onChange={onChange} value={note.description} autoComplete='off' />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Note Tag" onChange={onChange} value={note.tag} autoComplete='off' />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <button disabled={!note.title || !note.description || !note.tag} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}