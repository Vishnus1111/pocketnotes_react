import { createContext, useState, useEffect } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [groups, setGroups] = useState(() => {
        const stored = localStorage.getItem("pocket-notes-groups");
        return stored ? JSON.parse(stored) : [];
    });

    const [notes, setNotes] = useState(() => {
        const stored = localStorage.getItem("pocket-notes-data");
        return stored ? JSON.parse(stored) : [];
    });

    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        localStorage.setItem("pocket-notes-groups", JSON.stringify(groups));
    }, [groups]);

    useEffect(() => {
        localStorage.setItem("pocket-notes-data", JSON.stringify(notes));
    }, [notes]);

    return (
        <NotesContext.Provider
            value={{
                groups,
                setGroups,
                notes,
                setNotes,
                selectedGroup,
                setSelectedGroup
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
