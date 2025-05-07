import React, { useEffect, useState } from "react";
import "../style/event.css";
import axios from "axios";
import EventCard from "./EventCard";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Events = () => {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Fetch events data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/events`, {
        withCredentials: true,
      });

      // if there is no notes transform it into an empty array so i can map over it
      const data = res.data.map((event) => ({
        ...event,
        notes: event.notes ? event.notes : [],
      }));

      setEvents(data);
      //  set filtered events to all events and render it
      setFilteredEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to load events.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (filterValue) => {
    const normalizedFilter = filterValue.toLowerCase().replace(/\s+/g, "");
    const filtered = events.filter((event) =>
      event.event_name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(normalizedFilter)
    );
    setFilteredEvents(filtered);
  };

  return (
    <>
      <EventCard
        events={filteredEvents} // Passing the filtered events
        allEvents={events}
        onFilterChange={handleFilterChange} // Passing filter handler
        fetchData={fetchData}
        error={error}
      />
    </>
  );
};

export default Events;
