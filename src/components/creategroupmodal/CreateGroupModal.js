import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import "./CreateGroupModal.css";

const COLORS = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF"
];

const CreateGroupModal = ({ onClose }) => {
  const { groups, setGroups } = useContext(NotesContext);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleCreate = () => {
    if (!name.trim()) return;
    const newGroup = { name: name.trim(), color: selectedColor };
    setGroups([...groups, newGroup]);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Create New Group</h3>
        <input
          type="text"
          value={name}
          placeholder="Enter group name"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="color-picker">
          <span>Choose Color</span>
          <div className="color-options">
            {COLORS.map((color) => (
              <div
                key={color}
                className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
