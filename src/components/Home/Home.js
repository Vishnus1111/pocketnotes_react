import React, { useContext } from "react";
import "./Home.css";
import lockImage from "../../assests/notes-img.png";
import lock from "../../assests/hammer.png"; // using hammer asset as lock icon
import Sidebar from "../Sidebar/sidebar";
import NotesArea from "../NotesArea/NotesArea";
import { NotesContext } from "../../context/NotesContext";

const Home = () => {
  const { selectedGroup } = useContext(NotesContext);

  return (
    <div className="home-wrapper">
      <Sidebar />
      {selectedGroup ? (
        <NotesArea />
      ) : (
        <div className="home-container">
          <div className="home-center">
            <img src={lockImage} alt="welcome" className="home-image" />
            <h1 className="home-heading">Pocket Notes</h1>
            <p className="home-text">
              Send and receive messages without keeping your phone online.
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </div>
          <div className="home-footer-info">
            <img src={lock} alt="encrypted" className="footer-icon" />
            <span className="footer-text">end-to-end encrypted</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

