import mongoose, { InferSchemaType, Model, Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
},
    { timestamps: true }
);
// Document interface
// No need to define TS interface any more.
// interface note {
//   title: string;
//   text: string;
// }

type Note = InferSchemaType<typeof noteSchema>
// InferSchemaType will determine the type as follows:
// type User = {
//   title: string;
//   text: string;
// }


export default model<Note>("Note", noteSchema);