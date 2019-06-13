import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Notes extends Component {
    
    render() {
        const id = this.props.id;
        console.log(id);
        return (
            <Link onClick={() => this.props.setSelectedNote(this.props.id)} style={{textDecoration: 'none', color: 'black'}} to={`/notes/:${this.props.id}`} className="Note">
                <p>{this.props.name}</p>
                <p>{this.props.content}</p>
                <p>{this.props.date}</p>
            </Link>
        )
    }
}