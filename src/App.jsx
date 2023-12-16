import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Alerts, Footer, Home, Login, Navbar, Notes, Signup } from "./components";
import NotesState from "./context/notes/NotesState";

function App() {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    return (
        <NotesState>
            <Router>
                <Navbar showAlert={showAlert} />
                <Alerts alert={alert} />
                <Routes>
                    <Route exact path="/" element={<Home showAlert={showAlert} />} />
                    <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                    <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
                </Routes>
                <Footer year={"2024"} title={"iNotebook"} creator={"Sikku Sharma"} />
            </Router>
        </NotesState>
    )
}

export default App;