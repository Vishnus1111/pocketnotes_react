import React from "react";
import "./NotesCard.css";

const NoteCard = ({ note }) => {
  const date = new Date(note.timestamp);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = date.toLocaleDateString();

  return (
    <div className="note-card">
      <p className="note-text">{note.text}</p>
      <p className="note-time">{formattedTime} • {formattedDate}</p>
    </div>
  );
};

export default NoteCard;
