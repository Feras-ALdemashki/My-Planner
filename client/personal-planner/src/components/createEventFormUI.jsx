// CreateEventFormUI.jsx
import React from "react";

const CreateEventFormUI = ({
  inputs,
  notes,
  error,
  handleChange,
  handleNoteChange,
  onSubmit,
}) => {
  return (
    <div className="create-event-form">
      <h2>Create Event</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
        <textarea
          placeholder="Event Description"
          name="description"
          onChange={handleChange}
          value={inputs.description}
        />
        <input
          type="text"
          placeholder="Event Location"
          name="location"
          onChange={handleChange}
          value={inputs.location}
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={inputs.date}
        />
        <input
          type="time"
          name="time"
          onChange={handleChange}
          value={inputs.time}
        />

        <div className="notes">
          <h4>Event Notes</h4>
          {notes.map((note, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Note #${index + 1}`}
              value={note}
              onChange={(e) => handleNoteChange(index, e.target.value)}
            />
          ))}
        </div>

        <button type="submit">Create Event</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default CreateEventFormUI;
