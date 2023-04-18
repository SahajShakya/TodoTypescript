import React from 'react'
import { Note as NoteModel } from "../models/note";
import { Card } from 'react-bootstrap';

import "../styles/noteModels.css";
import { FormatDate } from '../utiils/FormatDate';

interface NoteProps {
    note: NoteModel,
    className?: string,
}

const Note = ({ note, className }: NoteProps) => {

    const { title, text, createdAt, updatedAt } = note;

    let createdUpdateText: string;
    if (updatedAt > createdAt) {
        createdUpdateText = "Updated: " + FormatDate(updatedAt);
    }
    else {
        createdUpdateText = "created: " + FormatDate(createdAt);
    }

    return (
        <>
            <Card className={`noteCard ${className}`}>
                <Card.Body className='cardBody'>
                    <Card.Title>{ title }</Card.Title>
                    <Card.Text className="cardText">{ text }</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>{createdUpdateText}</Card.Footer>
            </Card>
        </>
    )
}

export default Note