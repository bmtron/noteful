import React, { Component } from 'react';
import Folder from './Folder';
import NoteContext from './NoteContext';

export default class FolderSidebar extends Component {
    static contextType = NoteContext;

    render() {
        console.log(this.context);
        const test = this.context || {};    
        return (
            <div>
                {test.folders.map((item, index) => {
                    return <Folder name={item.name} key={index} id={item.id} setSelectedFolder={test.onSelectFolder}/>;
                })}
            </div>
        )
    }
}