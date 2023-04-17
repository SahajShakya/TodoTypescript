import { NextFunction, RequestHandler, Request, Response } from "express";
import noteModel from "../models/noteModel";
import { Interface } from "readline";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes:RequestHandler =  async (req: Request, res: Response, next: NextFunction) => {
    //Error Handling
    try {
        const notes = await noteModel.find().exec();
        // The await keyword is used to wait for a promise to resolve before proceeding further in an asynchronous function. 
        // asynchronous function to fetch data from a MongoDB database using a model called noteModel and 
        // the find() method, which returns a promise.

        // The find() method in Mongoose, which is an Object Document Mapper (ODM) for MongoDB in Node.js, is used to query a collection 
        // for documents that match a specified query criteria. In this case, noteModel.find().exec() is used to retrieve all documents 
        // from the MongoDB collection associated with the noteModel model.

        // The exec() method is used to execute the query and return a promise that resolves to the retrieved documents. 
        // The await keyword is used to wait for the promise to resolve, and the retrieved documents are assigned to the nodes variable
        // after the promise resolves.
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}


export const getNote:RequestHandler = async(req:Request, res:Response, next:NextFunction) => {    
    const noteId = req.params.noteId;
    console.log(noteId);
    try {
        //Beacause mongoose cannot detect what id should be thrown for invalid id
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Note ID");
        }
        const note = await noteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);
        
    } catch (error) {
        next(error);
    }
}

interface CreateNoteType {
    title?: string,
    text?: string,
}

export const createNotes:RequestHandler<unknown, unknown, CreateNoteType, unknown> =async (req, res, next) => {
    const {title, text} = req.body;
    try {

        if (!title) {
            throw createHttpError(400, "You need a title")
        }

        const newNote = await noteModel.create({
            title: title,
            text: text,
        });
        res.status(201).json(newNote);
        res.status(201).json({
            message: "Note Created",
        });
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteParams {
    noteId: string,    
}

interface UpdateNoteType {
    title?: string,
    text?: string,
}
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteType, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    // const { newTitle, newText } = req.body;
    console.log(newTitle, newText);
    try {
        //Beacause mongoose cannot detect what id should be thrown for invalid id
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Note ID");
        }
        if (!newTitle) {
            throw createHttpError(400, "You need a title");
        }

        const note = await noteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }        
        note.title = newTitle;
        note.text = newText;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
        
    } catch (error) {
        next(error);
    }
}

export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;
    try {
        //Beacause mongoose cannot detect what id should be thrown for invalid id
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Note ID");
        }

        const note = await noteModel.findById(noteId).exec();

        if(!note) {
            createHttpError(404,"Note not found");
        }

        await note?.deleteOne();
        //Status doesnt send reposne not by default without adding with json()
        res.status(204).json("Note deleted")


    } catch (error) {
        next(error);
    }
}