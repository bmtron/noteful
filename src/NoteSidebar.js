import React, { Component } from 'react';

import NoteContext from './NoteContext';

class NoteSidebar extends Component {
    static contextType = NoteContext;
    render() {
        const test = this.context || {};
        const id = test.selectedNotes;
        const note = test.notes.find(item => item.id === id) || {};
        const folder = test.folders.find(item => note.folderId === item.id) || {};
        console.log(folder)
        return (
            <div className="folder_main">
                <button onClick={() => this.props.history.goBack()}>Go Back</button>
                <h2>{folder.name}</h2>
            </div>
        )
    }
}
export default NoteSidebar;