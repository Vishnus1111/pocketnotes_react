import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import "./NotesArea.css";

const NotesArea = () => {
  const { notes, setNotes, selectedGroup, setSelectedGroup, groups } = useContext(NotesContext);
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!content.trim()) return;

    const newNote = {
      id: Date.now(),
      group: selectedGroup,
      content: content.trim(),
      date: new Date().toLocaleString(),
    };

    const updatedNotes = Array.isArray(notes) ? [...notes, newNote] : [newNote];
    setNotes(updatedNotes);
    setContent("");
  };

  const handleBack = () => setSelectedGroup(null);

  const groupColor = groups.find((g) => g.name === selectedGroup)?.color || "#5b5fc7";

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const groupNotes = Array.isArray(notes)
    ? notes.filter((note) => note.group === selectedGroup)
    : [];

  return (
    <div className="notes-area">
      <div className="notes-header">
        <button className="back-button" onClick={handleBack}>←</button>
        <div className="group-icon" style={{ backgroundColor: groupColor }}>
          {getInitials(selectedGroup)}
        </div>
        <div className="group-name">{selectedGroup}</div>
      </div>

      <div className="notes-list">
        {groupNotes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-content">{note.content}</div>
            <div className="note-date">{note.date}</div>
          </div>
        ))}
      </div>

      <div className="note-footer">
        <textarea
          placeholder="Enter your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <button className="send-button" onClick={handleSave}>➤</button>
      </div>
    </div>
  );
};

export default NotesArea;
