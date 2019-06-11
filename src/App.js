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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: dummyStore,
      selected: dummyStore.folders[0].id,
      selectedNote: dummyStore.notes[0].id
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
  render() {
    
    return (
      <div className="App">
        <Link to='/'>
          <header>
            <h1>Noteful</h1>
          </header>
        </Link>
        <main>
          <section className="sidebar">
            <Route exact path='/' render={(props) => <MainSidebar info={this.state.store} setSelectedFolder={this.setSelectedFolder}/>}/>
            <Route path='/folder/:folderId' render={(props) => <FolderSidebar info={this.state.store} setSelectedFolder={this.setSelectedFolder}/>}/>
            <Route path='/notes/:notesId' render={(props) => <NotesSidebar info={this.state.store} note={this.state.selectedNote}/>}/>
          </section>
          <section className="main">
            <Route exact path='/' render={(routerProps) => <MainMain selectedNote={this.setSelectedNote} info={this.state.store}/>}/>
            <Route path='/folder/:folderId' render={(routerProps) => <FolderMain selectedNote={this.setSelectedNote} info={this.state.store} folderId={this.state.selected}/>}/>
            <Route path='/notes/:notesId' render={(routerProps) => <NotesMain info={this.state.store} note={this.state.selectedNote}/>}/>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
