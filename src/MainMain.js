import React, { Component } from 'react';
import NoteContext from './NoteContext';
import Notes from './Notes';
import './Main.css';

export default class Main extends Component {
    static contextType = NoteContext;
    render() {
        const test = this.context || {};
        
        return (
            <div>
               {test.notes.map((item, index) => {
                   return <Notes setSelectedNote={test.setSelectedNote} key={index} id={item.id} folderId={item.folderId} name={item.name} content={item.content} date={item.modified}/>;
               })}
            </div>
        )
    }
}