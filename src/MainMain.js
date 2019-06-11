import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Notes from './Notes';
import './Main.css';

export default class Main extends Component {
    render() {
        return (
            <div>
               {this.props.info.notes.map((item, index) => {
                   return <Notes selectedNote={this.props.selectedNote} key={index} id={item.id} folderId={item.folderId} name={item.name} content={item.content} date={item.modified}/>;
               })}
            </div>
        )
    }
}