import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Folder.css';

export default class Folder extends Component {
    render() {
        return (
            <section className='folder_main'>
                <NavLink to={`/folder/${this.props.id}`} onClick={() => this.props.setSelectedFolder(this.props.id)}>{this.props.name}</NavLink>
            </section>
        )
    }
}

Folder.propTypes = {
    name: PropTypes.string,
    setSelectedFolder: PropTypes.func,
    id: PropTypes.string
}