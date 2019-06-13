import React, { Component } from 'react';
import Folder from './Folder';

export default class MainSidebar extends Component {
    render() {
        return (
            <section className="main_sidebar">
                {this.props.info.map((item, index) => {
                    return <Folder name={item.name} key={index} id={item.id} setSelectedFolder={this.props.setSelectedFolder}/>;
                })}
            </section>
        )
    }
}