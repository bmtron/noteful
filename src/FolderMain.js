import React, { Component } from 'react';
import Notes from './Notes';
import NoteContext from './NoteContext';

export default class FolderMain extends Component {
    static contextType = NoteContext;
    render() {
        const test = this.context || {};
        console.log(this.context.selectedFolder);
        const id = test.selectedFolder;
        let note = test.notes.map((item, index) => {
            if (item.folderId === id) {
                return item;
            }
            else {
                return null;
            }
        });
        note = note.filter(item => item !== null) || {};
        return (
            <div>
                {note.map((item, index) => {
                    return <Notes key={index} setSelectedNote={test.setSelectedNote} id={item.id} folderId={item.folderId} name={item.name} content={item.content} date={item.modified}/>;
                })}
            </div>
        )
    }
}