/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ showAlert }) {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cPassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credential;
        const response = await fetch((`http://localhost:5100/api/auth/createUser`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        // console.log(json);

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem("auth_token", json.auth_jwt)
            navigate("/")
            showAlert("User Created Successfully", "success")
        }
        else {
            showAlert("Invalid Credentials!", "danger")
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5 mx-auto'>
            <h1 className="my-5 text-center fw-bold">Signup to iNotebook</h1>
            <form className="mx-5 px-5" onSubmit={handleSubmit}>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credential.name} onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword" name="cPassword" value={credential.cPassword} onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <button disabled={!credential.name || !credential.email || !credential.password || !credential.cPassword} type="submit" className="btn btn-secondary my-4">Signup</button>
                </div>
            </form>
        </div>
    )
}