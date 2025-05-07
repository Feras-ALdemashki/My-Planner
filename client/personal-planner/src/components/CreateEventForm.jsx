import React from "react";
import "../style/createEvent.css";
import useForm from "../utils/useForm";
import { useState } from "react";
import CreateEventFormUI from "./createEventFormUI";
const baseUrl = import.meta.env.VITE_BASE_URL;

const CreateEventForm = () => {
  const [notes, setNotes] = useState(["", "", ""]);
  const { inputs, error, handleChange, handleSubmit } = useForm(
    {
      name: "",
      description: "",
      location: "",
      date: "",
      time: "",
      notes: notes,
    },
    `${baseUrl}/events`,
    "/"
  );
  // this to set the values of the notes as an array to send it to the joint table in sql
  const handleNoteChange = (index, value) => {
    // updating the notes array based on the user input based on the index that the user is typing in
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //adding the notes value before the final submit
    inputs.notes = notes;
    handleSubmit(e);
  };
  return (
    <CreateEventFormUI
      inputs={inputs}
      notes={notes}
      error={error}
      handleChange={handleChange}
      handleNoteChange={handleNoteChange}
      onSubmit={onSubmit}
    />
  );
};

export default CreateEventForm;
