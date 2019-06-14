import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';

function deleteNote(noteId, cb) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json'
        },
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }
        return res.json();
    })
    .then(data => {
        cb(noteId)
        
    })
    .catch(error => {
        console.error(error);
    })
}

export default class Notes extends Component {
    
    render() {
        return (
            <NoteContext.Consumer>
                {(context) => (
                    <div>
                        <Link onClick={() => this.props.setSelectedNote(this.props.id)} style={{textDecoration: 'none', color: 'black'}} to={`/notes/:${this.props.id}`} className="Note">
                            <p>{this.props.name}</p>
                            <p>{this.props.content}</p>
                            <p>{this.props.date}</p>
                        </Link>
                        <button onClick={() => {
                                deleteNote(this.props.id, context.deleteNote);
                                this.props.history.push('/');
                                }
                            }>Delete Note</button>
                    </div>
                )}
            </NoteContext.Consumer>
        )
    }
}
Notes.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number,
    folderId: PropTypes.number,
    setSelectedNote: PropTypes.func.isRequired

}