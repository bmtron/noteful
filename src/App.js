import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import NotesSidebar from './NoteSidebar';
import FolderSidebar from './FolderSidebar';
import FolderMain from './FolderMain';
import MainSidebar from './MainSidebar';
import MainMain from './MainMain';
import NotesMain from './NotesMain';
import './Main.css'
import NoteContext from './NoteContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      selectedFolder: '',
      selectedNote: ''
    }
  }
  setSelectedFolder = (id) => {
    this.setState({
      selectedFolder: id
    })
    
  }
  setSelectedNote = (id) => {
    this.setState({
      selectedNote: id
    })
  }
  deleteNote = (id) => {
    const newNotes = this.state.notes.filter(note => note.id !== id);

    this.setState({
      notes: newNotes
    })
  }
  componentWillMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => this.setState({
      folders: data,
      selectedFolder: data[0].id
    })).catch(error => {
      console.error(error)
    });
    
    fetch('http://localhost:9090/notes', {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => this.setState({
      notes: data,
      selectedNote: data[2].id
    })).catch(error => {
      console.error(error)
    })
  }
  render() {
   
   const contextValue = {
     folders: this.state.folders,
     notes: this.state.notes,
     selectedFolder: this.state.selectedFolder,
     selectedNotes: this.state.selectedNote,
     setSelectedNote: this.setSelectedNote,
     setSelectFolder: this.setSelectedFolder,
     deleteNote: this.deleteNote
   }
   console.log(contextValue);
    return (

        <div className="App">
          <Link to='/'>
            <header>
              <h1>Noteful</h1>
            </header>
          </Link>
          <main>
            <NoteContext.Provider value={contextValue}>
              <section className="sidebar">
                <Route exact path='/' component={MainSidebar}/>
                <Route path='/folder/:folderId' component={FolderSidebar}/>
                <Route path='/notes/:notesId' component={NotesSidebar}/>
              </section>
              <section className="main">
                <Route exact path='/' component={MainMain}/>
                <Route path='/folder/:folderId' component={FolderMain}/>
                <Route path='/notes/:notesId' component={NotesMain}/>
              </section>
          </NoteContext.Provider>
          </main>
        </div>
      
    );
  }
}

export default App;
