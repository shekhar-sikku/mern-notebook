/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ showAlert }) {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch((`http://localhost:5100/api/auth/logInUser`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })
        const json = await response.json();
        console.log(json);

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem("auth_token", json.auth_jwt)
            showAlert("User Logged in Successfully", "success")
            navigate("/notes")
        }
        else {
            showAlert("Invalid Credentials!", "warning")
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5 mx-auto'>
            <h1 className="my-5 text-center fw-bold">Login to iNotebook</h1>
            <form className="mx-5 px-5" onSubmit={handleSubmit}>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credential.email} onChange={onChange} autoComplete="off" />
                    <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 mx-5 px-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3 mx-5 px-3">
                    <button disabled={!credential.email || !credential.password} type="submit" className="btn btn-primary my-4">Login</button>
                    <hr />
                    <p className="mt-3 fw-normal">Have an account? Signup to iNotebook!</p>
                    <Link to="/signup" className="btn btn-secondary my-3">Signup</Link>
                </div>
            </form>
        </div>
    )
}