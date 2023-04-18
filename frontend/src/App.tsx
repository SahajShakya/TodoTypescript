import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Note from './components/Note';
import { Note as NodelModel } from './models/note';
import * as NotesApi from "./network/UseFetch";

import "./styles/notePage.css"
import AddNoteDialogue from './components/AddNoteDialogue';

function App() {

  const [notes, setNotes] = useState<NodelModel[]>([]);
  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false)


  useEffect(() => {
    async function loadNotes() {
      try {
        const notes =  await NotesApi.UseFetch();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, [])

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialogue(true)}>Add new Notes</Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (
          <Col>
            <Note note={note} key={note._id} className='note' />
          </Col>
        ))}
      </Row>
      { showAddNoteDialogue && <AddNoteDialogue 
                                  onDissmiss={() => setShowAddNoteDialogue(false)} 
                                  onNoteSaved={(newNote) => { 
                                                setNotes([...notes, newNote]);
                                                setShowAddNoteDialogue(false)}} /> 
      }
    </Container>
  );
}

export default App;
