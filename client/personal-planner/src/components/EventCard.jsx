import React, { useState } from "react";
import DeleteBtn from "./DeleteBtn";
import "../style/event.css";
import Lottie from "lottie-react";
import animation from "../assets/animation.json";
import NoEvents from "./NoEvent";
import NewUserNoEvent from "./NewUserNoEvent";

const EventCard = ({ events, allEvents, onFilterChange, fetchData, error }) => {
  const [filterName, setFilterName] = useState("");

  const handleInputChange = (e) => {
    onFilterChange(e.target.value);
    setFilterName(e.target.value);
  };
  const isFilteredEmpty = events.length === 0 && allEvents.length > 0;
  const isUserNew = allEvents.length === 0;

  return (
    <>
      <div className="lottie-container">
        <Lottie animationData={animation} />
      </div>
      <div className="events-container">
        <div>
          <input
            className="filter-name"
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={handleInputChange}
          />
        </div>
        <div>{error}</div>
        {isUserNew ? (
          <NewUserNoEvent />
        ) : isFilteredEmpty ? (
          <NoEvents />
        ) : (
          events.map((e, i) => (
            <div className="event-card" key={i}>
              <div className="details-card">
                <p>
                  <strong>Name: </strong> &nbsp;{e.event_name}
                </p>
                <p>
                  <strong>Description: </strong>&nbsp; {e.event_description}
                </p>
                <p>
                  <strong>Location:</strong>&nbsp; {e.event_location}
                </p>
                <p>
                  <strong>Date:</strong>&nbsp;
                  {new Date(e.event_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>&nbsp;
                  {new Date(`1970-01-01T${e.event_time}`).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <div className="btn-container">
                  <DeleteBtn id={e.event_id} onDelete={fetchData} />
                </div>
              </div>

              <div className="note-card">
                <h5>Notes</h5>
                <ul>
                  {Array.isArray(e.notes) &&
                    e.notes
                      .filter((note) => note && note.content)
                      .map((note, i) => <li key={i}>{note.content}</li>)}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default EventCard;
