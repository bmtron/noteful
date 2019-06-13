import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NoteSidebar extends Component {
    render() {
        const id = this.props.note;
        let note = this.props.noteInfo.find(item => item.id === id);

        let folder = this.props.info.find(item => item.id === note.folderId);
        

        return (
            <div className="folder_main">
                <button onClick={() => this.props.history.goBack()}>Go Back</button>
                <h2>{folder.name}</h2>
            </div>
        )
    }
}
export default withRouter(NoteSidebar);