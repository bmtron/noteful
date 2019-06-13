import React, { Component } from 'react';
import Folder from './Folder';
import NoteContext from './NoteContext';

export default class MainSidebar extends Component {
    static contextType = NoteContext;
    render() {
        const test = this.context || {};
        return (
            <section className="main_sidebar">
                {test.folders.map((item, index) => {
                    return <Folder name={item.name} key={index} id={item.id} setSelectedFolder={test.onSelectedFolder}/>;
                })}
            </section>
        )
    }
}