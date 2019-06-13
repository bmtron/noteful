import React from 'react';


const NoteContext = React.createContext({
    notes: [],
    folders: [],
    selectedFolder: '',
    selectedNotes: '',
    
})

export default NoteContext;