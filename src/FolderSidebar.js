import React, { Component } from 'react';
import Folder from './Folder';
export default class FolderSidebar extends Component {
    render() {
        
        return (
            <div>
                {this.props.info.folders.map((item, index) => {
                    return <Folder name={item.name} key={index} id={item.id} setSelectedFolder={this.props.setSelectedFolder}/>;
                })}
            </div>
        )
    }
}