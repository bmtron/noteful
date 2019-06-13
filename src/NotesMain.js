import React, { Component } from 'react';

export default class NotesMain extends Component {
    render() {
        
        let id = this.props.note;
        let note = this.props.info.find(item => item.id === id);
        return (
            <div>
                <p>{note.name}</p>
                <p>{note.content}</p>
                <p>{note.modified}</p>
            </div>
        )
    }
}