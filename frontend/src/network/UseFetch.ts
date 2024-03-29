import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    }
    else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
    
}

export async function UseFetch(): Promise<Note[]> {
    const response = await fetchData("/api/notes", {method: "GET",});
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function UseCreate(note: NoteInput):Promise<Note> {
    const response  = await fetchData("/api/notes", 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(note)
        }
    )
    return response.json();
}