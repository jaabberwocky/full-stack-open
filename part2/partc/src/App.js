import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    const hook = () => {
        noteService.getAll().then((notes) => {
            setNotes(notes);
        });
    };
    useEffect(hook, [showAll]); // if the second arg is empty array, only run on first render

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5, // 50% chance to be important
        };
        noteService.create(noteObject).then((resp) => {
            setNotes(notes.concat(resp));
            setNewNote('');
        });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService.update(id, changedNote).then((resp) => {
            setNotes(notes.map((note) => (note.id !== id ? note : resp)));
        });
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
            <br />
            <i>Showing {showAll ? 'all' : 'important'} notes</i>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
