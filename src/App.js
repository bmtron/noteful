import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import NotesSidebar from './NoteSidebar';
import FolderSidebar from './FolderSidebar';
import FolderMain from './FolderMain';
import dummyStore from './dummyStore';
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
      selected: id
    })
  }
  setSelectedNote = (id) => {
    this.setState({
      selectedNote: id
    })
  }
  fetchFolders = () => {

    fetch('https://localhost:9090/folders', {
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
    })
  }
  
  componentDidMount() {
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
      selectedNote: data[0].id
    })).catch(error => {
      console.error(error)
    })
  }
  render() {
   console.log(NoteContext); 
   const contextValue = {
     folders: this.state.folders,
     notes: this.state.notes,
     selectedFolder: this.state.selectedFolder,
     selectedNotes: this.state.selectedNotes
   }
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
                <Route exact path='/' render={(props) => <MainSidebar info={this.state.folders} setSelectedFolder={this.setSelectedFolder}/>}/>
                <Route path='/folder/:folderId' render={(props) => <FolderSidebar info={this.state.folders} setSelectedFolder={this.setSelectedFolder}/>}/>
                <Route path='/notes/:notesId' render={(props) => <NotesSidebar info={this.state.folders} noteInfo={this.state.notes} note={this.state.selectedNote}/>}/>
              </section>
              <section className="main">
                <Route exact path='/' render={(routerProps) => <MainMain selectedNote={this.setSelectedNote} info={this.state.notes}/>}/>
                <Route path='/folder/:folderId' render={(routerProps) => <FolderMain selectedNote={this.setSelectedNote} info={this.state.notes} folderId={this.state.selected}/>}/>
                <Route path='/notes/:notesId' render={(routerProps) => <NotesMain info={this.state.notes} note={this.state.selectedNote}/>}/>
              </section>
          </NoteContext.Provider>
          </main>
        </div>
      
    );
  }
}

export default App;
