import React, { Component } from 'react';
import NoteContext from './NoteContext';
import ValidationError from './ValidationError';

export default class AddNote extends Component {
    static contextType = NoteContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            folder: '',
            nameValid: false,
            contentValid: false,
            folderValid: false,
            formValid: false,
            validationMessages: {
                name: '',
                content: '',
                folder: ''
            }
        }
    }
    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();

        if(fieldValue.length === 0) {
            fieldErrors.name = 'Name is required';
            hasError = true;
        } else {
            fieldErrors.name = '';
            hasError = false;
        }
        this.setState({
            validationMessages: fieldErrors,
            nameValid: !hasError
        }, this.formValid);
    }
    validateContent(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();

        if(fieldValue.length === 0) {
            fieldErrors.content = 'Name is required';
            hasError = true;
        } else {
            fieldErrors.content = '';
            hasError = false;
        }
        this.setState({
            validationMessages: fieldErrors,
            contentValid: !hasError
        }, this.formValid);
    }
    validateFolder(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();

        if(fieldValue.length === 0) {
            fieldErrors.folder = 'Name is required';
            hasError = true;
        } else {
            fieldErrors.folder = '';
            hasError = false;
        }
        this.setState({
            validationMessages: fieldErrors,
            folderValid: !hasError
        }, this.formValid);
    }
    formValid() {
        this.setState({formValid: this.state.nameValid})
    }
    updateFolder(folder) {
        this.setState({folder}, () => {this.validateFolder(folder)} );
    }
    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
    }
    updateContent(content) {
        this.setState({content}, () => {this.validateContent(content)});
    }
    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                content: this.state.content,
                folderId: this.state.folder
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error;
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name: '',
                content: '',
                folder: ''
            });
        })
        .catch(err => {
            this.setState({
                error: err.message
            });
        });
    }
    render() {
        console.log(this.state.folder);
        console.log(this.state.content);
        console.log(this.state.name);
        return (
            <form className="Add_Note">
                <div className="form_group">
                    <label htmlFor="name">
                        Note Name
                    </label>
                    <input name="name" id="name" type="text" onChange={e => this.updateName(e.target.value)}/>
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
                </div>
                <div className="form_group">
                    <label htmlFor="content">Note Content</label>
                    <input name="content" id="content" type="text" onChange={e => this.updateContent(e.target.value)}/>
                    <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>
                </div>
                <div className="form_group">
                    <label htmlFor="folder">Select a folder:</label>
                    <select name="folder" id="folder" onChange={e => this.updateFolder(e.target.value)}>
                        {this.context.folders.map((item, index) => {
                            return <option key={index}  value={item.id}>{item.name}</option>
                        })}
                    </select>
                    <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder}/>
                </div>
                <button type="submit" onClick={(event) => {this.handleSubmit(event); window.location.reload();}} disabled={!this.state.formValid}>Add Note</button>
            </form>
        )
    }
}