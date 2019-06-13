import React, { Component } from 'react';
import NoteContext from './NoteContext';
import Notes from './Notes';

export default class NotesMain extends Component {
    static contextType = NoteContext;
    render() {
        const test = this.context || {};
        let id = test.selectedNotes;
        let note = test.notes.find(item => item.id === id) || {};
        
        return (
            <div>
                <Notes history={this.props.history} name={note.name} content={note.content} date={note.modified} folderId={note.folderId} id={note.id}/>
            </div>
        )
    }
}