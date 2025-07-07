import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import CreateGroupModal from "../creategroupmodal/CreateGroupModal";
import "./Sidebar.css";
import plusBtn from "../../assests/plus-btn.png";


const Sidebar = () => {
  const { groups, setSelectedGroup } = useContext(NotesContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="sidebar">
      {/* Sidebar header */}
      <div className="sidebar-header">
        <h2>Pocket Notes</h2>
      </div>

      {/* Group list */}
      <div className="group-list">
        {groups.map((group, index) => (
          <div
            key={index}
            className="group-item"
            onClick={() => setSelectedGroup(group.name)}
          >
            <div
              className="group-circle"
              style={{ backgroundColor: group.color }}
            >
              {getInitials(group.name)}
            </div>
            <span className="group-name">{group.name}</span>
          </div>
        ))}
      </div>

      {/* Plus Button at the bottom */}
      <div className="sidebar-footer">
        <button className="plus-button" onClick={() => setShowModal(true)}>
          <img src={plusBtn} alt="Add" />
        </button>
      </div>

      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");

export default Sidebar;
