import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import "./NotesArea.css";
import textSend from "../../assests/textsend.png";
import disableTextSend from "../../assests/disabletextsend.png";

// Normalize any stored date (including old `toLocaleString` with comma) to: 9 Mar 2023 • 10:10 AM
const formatNoteDate = (input) => {
  try {
    // If previously stored string already contains a bullet, we still re-parse for consistency
    // Replace comma variants before parsing (e.g., "7 Jul 2025, 2:56 PM")
    const cleaned = typeof input === 'string' ? input.replace(/,/g, '') : input;
    const d = cleaned instanceof Date ? cleaned : new Date(cleaned);
    if (isNaN(d)) return String(input ?? '');
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
  } catch {
    return String(input ?? '');
  }
};

const NotesArea = () => {
  const { notes, setNotes, selectedGroup, setSelectedGroup, groups, selectedGroupIndex, setSelectedGroupIndex } = useContext(NotesContext);
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!content.trim()) return;

    const newNote = {
      id: Date.now(),
      group: selectedGroup,
      content: content.trim(),
      date: new Date().toISOString(),
    };

    const updatedNotes = Array.isArray(notes) ? [...notes, newNote] : [newNote];
    setNotes(updatedNotes);
    setContent("");
  };


  const groupColor = (selectedGroupIndex != null && groups[selectedGroupIndex]) ? groups[selectedGroupIndex].color : (groups.find((g) => g.name === selectedGroup)?.color || "#5b5fc7");

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const groupNotes = Array.isArray(notes)
    ? notes.filter((note) => note.group === selectedGroup)
    : [];

  return (
    <div className="notes-area">
      <div className="notes-header">
        <button
          className="back-button"
          aria-label="Back to groups"
          onClick={() => { setSelectedGroup(null); setSelectedGroupIndex(null); }}
        >
          &#8592;
        </button>
        <div className="group-icon" style={{ backgroundColor: groupColor }}>
          {getInitials(selectedGroup)}
        </div>
        <div className="group-name">{selectedGroup}</div>
      </div>

      <div className="notes-list">
        {groupNotes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-content">{note.content}</div>
            <div className="note-date">{formatNoteDate(note.date)}</div>
          </div>
        ))}
      </div>

      <div className="note-footer">
        <div className="input-wrapper">
          <textarea
            placeholder="Enter your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <button
            className="send-button"
            onClick={handleSave}
            disabled={!content.trim()}
            aria-label="Send note"
          >
            <img
              src={content.trim() ? textSend : disableTextSend}
              alt={content.trim() ? "Send" : "Send disabled"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesArea;
