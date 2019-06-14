import React, { Component } from 'react';
import ValidationError from './ValidationError';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            idValid: false,
            nameValid: false,
            formValid: false,
            validationMessages: {
                name: ''
            }
        }
    }
    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
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
    formValid() {
        this.setState({
            formValid: this.state.nameValid
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:9090/folders", {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name: ''
            })
        })
        .catch(err => {
            this.setState({
                error: err.message
            });
        });
    }


    render() {
        return (
            <form className="Add_Folder">
                <div className="form_group">
                    <label htmlFor="name">Name</label>
                    <input className="folder_name" name="name" id="name" onChange={e => this.updateName(e.target.value)} defaultValue="Enter a name for your folder"/>
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
                </div>
                <div className="Submit_folder">
                    <button type="submit" onClick={e => {this.handleSubmit(e); window.location.reload();}} disabled={!this.state.formValid}>Add Folder</button>
                </div>
            </form>
        )
    }
}