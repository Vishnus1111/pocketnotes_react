import React, { useContext } from "react";
import { NotesContext } from "./context/NotesContext";
import Sidebar from "./components/Sidebar/sidebar";
import NotesArea from "./components/NotesArea/NotesArea";
import "./App.css";
import welcomeImg from "./assests/notes-img.png";

function App() {
  const { selectedGroup } = useContext(NotesContext);

  return (
    <div className="app-container">
      <Sidebar />

      {selectedGroup ? (
        <NotesArea />
      ) : (
        <div className="welcome-screen">
          <img src={welcomeImg} alt="welcome" className="welcome-image" />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
