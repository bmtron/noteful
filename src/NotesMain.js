import React, { Component } from 'react';
import NoteContext from './NoteContext';

export default class NotesMain extends Component {
    static contextType = NoteContext;
    render() {
        const test = this.context || {};
        let id = test.selectedNotes;
        let note = test.notes.find(item => item.id === id) || {};
        
        return (
            <div>
                <p>{note.name}</p>
                <p>{note.content}</p>
                <p>{note.modified}</p>
                <p>{note.id}</p>
            </div>
        )
    }
}