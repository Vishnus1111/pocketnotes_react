import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import CreateGroupModal from "../creategroupmodal/CreateGroupModal";
import "./Sidebar.css";
import plusBtn from "../../assests/plus-btn.png";




const Sidebar = () => {
  const { groups, setSelectedGroup, selectedGroup, selectedGroupIndex, setSelectedGroupIndex } = useContext(NotesContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`sidebar ${!selectedGroup ? "mobile-visible" : "hidden"}`}>
      {/* Sidebar header */}
      <div className="sidebar-header">
        <h2>Pocket Notes</h2>
      </div>

      {/* Group list */}
      <div className="group-list">
        {groups.map((group, index) => (
          <div
            key={index}
            className={`group-item ${selectedGroupIndex === index ? 'active' : ''}`}
            onClick={() => { setSelectedGroup(group.name); setSelectedGroupIndex(index); }}
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

      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}

      <div className="sidebar-footer">
        <button className="plus-button" onClick={() => setShowModal(true)}>
          <img src={plusBtn} alt="Add" />
        </button>
      </div>


      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

const getInitials = (name) => {
  if (!name) return "";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  // Use only the first letters of the first two words
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

export default Sidebar;
