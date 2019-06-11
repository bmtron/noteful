import React, { Component } from 'react';
import Notes from './Notes';

export default class FolderMain extends Component {

    render() {
        const id = this.props.folderId;
        let note = this.props.info.notes.map((item, index) => {
            if (item.folderId === id) {
                return item;
            }
            else {
                return null;
            }
        });
        note = note.filter(item => item !== null);
        return (
            <div>
                {note.map((item, index) => {
                    return <Notes key={index} selectedNote={this.props.selectedNote} id={item.id} folderId={item.folderId} name={item.name} content={item.content} date={item.modified}/>;
                })}
            </div>
        )
    }
}