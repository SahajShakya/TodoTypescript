import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/UseFetch";
import { Note } from "../models/note";

interface AddNoteDialogProps {
    onDissmiss: () => void,
    onNoteSaved: ( note: Note ) => void,
}

const AddNoteDialogue = ({ onDissmiss, onNoteSaved }: AddNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NotesApi.NoteInput>();

    async function onSubmit(input: NotesApi.NoteInput) {
        try {
            const noteResponse = await NotesApi.UseCreate(input);
            onNoteSaved(noteResponse)
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDissmiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" isInvalid={!!errors.title} {...register("title", { required: "Required" })} />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>



                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Text" isInvalid={!!errors.text} {...register("text", { required: "Required" })} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addNoteForm" disabled={isSubmitting}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNoteDialogue

function onNoteSaved(noteResponse: Note) {
    throw new Error("Function not implemented.");
}
