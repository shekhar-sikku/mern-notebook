/* eslint-disable react/prop-types */
import { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext';

export default function NotesItem(props) {
    const context = useContext(NotesContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;

    return (
        <div className="card col-md-3 m-4 justify-content-between">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <span className="fw-bold">iNotebook</span>
                    <span className="">
                        <i className="fa-solid fa-pen-to-square me-2" style={{ cursor: 'pointer' }} onClick={() => { updateNote(note) }} />
                        <i className="fa-solid fa-trash ms-2" style={{ cursor: 'pointer' }} onClick={() => {
                            deleteNote(note._id)
                            showAlert("Note Deleted Successfully!", "danger")
                        }} />
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-start my-2">
                    <h5 className="card-title"> {note.title} </h5>
                </div>
                <p className="card-text"> {note.description} </p>
                <h6 className="card-tag"> {note.tag} </h6>
            </div>
        </div>
    )
}