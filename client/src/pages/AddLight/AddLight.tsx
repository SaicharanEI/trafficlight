import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTrafficLight,TrafficLightSchedule } from "../../store/trafficSlice";

const AddTrafficLightForm = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);

  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      {
        timePeriod: "",
        startTime: "",
        endTime: "",
        redDuration: 0,
        yellowDuration: 0,
        greenDuration: 0,
      },
    ]);
  };

  const handleRemoveSchedule = (index: number) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const newTrafficLight = {
      id: Math.floor(Math.random() * 1000),
      name,
      currentColor: "red",
      location,
      schedules,
    };

    dispatch(addTrafficLight(newTrafficLight));

    setName("");
    setLocation("");
    setSchedules([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      {schedules.map((schedule, index) => (
        <div key={index}>
          <h3>Schedule {index + 1}</h3>
          <label htmlFor={`timePeriod-${index}`}>Time Period:</label>
          <input
            type="text"
            id={`timePeriod-${index}`}
            value={schedule.timePeriod}
            onChange={(e) =>
              setSchedules((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, timePeriod: e.target.value } : item
                )
              )
            }
            required
          />
          <label htmlFor={`startTime-${index}`}>Start Time:</label>
          <input
            type="time"
            id={`startTime-${index}`}
            value={schedule.startTime}
            onChange={(e) =>
              setSchedules((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, startTime: e.target.value } : item
                )
              )
            }
            required
          />
          <label htmlFor={`endTime-${index}`}>End Time:</label>
          <input
            type="time"
            id={`endTime-${index}`}
            value={schedule.endTime}
            onChange={(e) =>
              setSchedules((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, endTime: e.target.value } : item
                )
              )
            }
            required
          />
          <label htmlFor={`redDuration-${index}`}>Red Duration (seconds):</label>
          <input
            type="number"
            id={`redDuration-${index}`}
            value={schedule.redDuration}
            onChange={(e) =>
              setSchedules((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, redDuration: parseInt(e.target.value) } : item
                )
              )
            }
            required
          />
          <label htmlFor={`yellowDuration-${index}`}>Yellow Duration (seconds):</label>
          <input
            type="number"
            id={`yellowDuration-${index}`}
            value={schedule.yellowDuration}
            onChange={(e) =>
              setSchedules((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, yellowDuration: parseInt(e.target.value) } : item
                )
              )
            }
            required
          />
          <label htmlFor={`greenDuration-${index}`}>Green Duration (seconds):</label>
          <input
            type="number"
            id={`greenDuration-${index}`}
            value={schedule.greenDuration}
            onChange={(e) =>
              setSchedules((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, greenDuration: parseInt(e.target.value) } : item
                )
              )
            }
            required
          />
          <button type="button" onClick={() => handleRemoveSchedule(index)}>
            Remove Schedule
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddSchedule}>
        Add Schedule
      </button>

      <button type="submit">Add Traffic Light</button>
    </form>
  );
};

export default AddTrafficLightForm;
