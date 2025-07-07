import React, { useContext } from "react";
import "./Home.css";
import lockImage from "../../assests/notes-img.png";
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
          <img src={lockImage} alt="lock" className="home-image" />
          <h1 className="home-heading">Pocket Notes</h1>
          <p className="home-text">
            Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

