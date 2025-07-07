import React, { useContext, useState, useEffect } from "react";
import { NotesContext } from "./context/NotesContext";
import Sidebar from "./components/Sidebar/sidebar";
import NotesArea from "./components/NotesArea/NotesArea";
import "./App.css";
import welcomeImg from "./assests/notes-img.png";

function App() {
  const { selectedGroup } = useContext(NotesContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      {isMobile ? (
        selectedGroup ? <NotesArea /> : <Sidebar />
      ) : (
        <>
          <Sidebar />
          {selectedGroup ? (
            <NotesArea />
          ) : (
            <div className="welcome-screen">
              <img src={welcomeImg} alt="welcome" className="welcome-image" />
              <h1>Pocket Notes</h1>
              <p>
                Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
