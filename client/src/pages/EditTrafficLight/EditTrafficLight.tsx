import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TrafficLight, TrafficLightSchedule } from "../../store/trafficSlice";
import useFetch from "../../utils/service";
import Toast from "../../utils/Toast"; // Assuming Toast is your notification component

function TrafficLightEdit() {
  const { id } = useParams<{ id: string }>();
  const { fetchData, state } = useFetch();
  const [trafficLight, setTrafficLight] = useState<TrafficLight | null>(null);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);

  useEffect(() => {
    if (id) {
      fetchData(`trafficlight/${id}`, "GET");
    }
  }, [id]);

  useEffect(() => {
    if (state.data) {
      const fetchedTrafficLight: TrafficLight = state.data;
      setTrafficLight(fetchedTrafficLight);
      setName(fetchedTrafficLight.name);
      setLocation(fetchedTrafficLight.location);
      setSchedules(fetchedTrafficLight.schedules);
    }
  }, [state.data]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (trafficLight) {
      const updatedTrafficLight: TrafficLight = {
        ...trafficLight,
        name,
        location,
        schedules,
      };

      fetchData(`updatetrafficlight/${id}`, "PUT", updatedTrafficLight)
       
    }
  };

  const handleAddSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      {
        id: undefined,
        timePeriod: "",
        startTime: "",
        endTime: "",
        redDuration: 0,
        yellowDuration: 0,
        greenDuration: 0,
        trafficLightId: Number(id),
      },
    ]);
  };

  const handleRemoveSchedule = async (index: number) => {
    const scheduleToRemove = schedules[index];
    if (scheduleToRemove.id) {
      await fetchData(`deleteschedule/${scheduleToRemove.id}`, "DELETE");
    }
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof TrafficLightSchedule,
    value: string | number
  ) => {
    setSchedules((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  if (!trafficLight) {
    return <h1 className="app-main-heading">Traffic light not found</h1>;
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h1 className="app-main-heading">Edit Traffic Light</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor="name">
            Name:
          </label>
          <input
            className="app-input-field"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor="location">
            Location:
          </label>
          <input
            className="app-input-field"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>
      {schedules.map((schedule, index) => (
        <div key={index}>
          <h3>Schedule {index + 1}</h3>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div className="app-input-container">
              <label className="app-input-label" htmlFor={`timePeriod-${index}`}>
                Time Period:
              </label>
              <input
                className="app-input-field"
                type="text"
                id={`timePeriod-${index}`}
                value={schedule.timePeriod}
                onChange={(e) =>
                  handleScheduleChange(index, "timePeriod", e.target.value)
                }
                required
              />
            </div>
            <div className="app-input-container">
              <label className="app-input-label" htmlFor={`startTime-${index}`}>
                Start Time:
              </label>
              <input
                className="app-select-field"
                type="time"
                id={`startTime-${index}`}
                value={schedule.startTime}
                onChange={(e) =>
                  handleScheduleChange(index, "startTime", e.target.value)
                }
                required
              />
            </div>
            <div className="app-input-container">
              <label className="app-input-label" htmlFor={`endTime-${index}`}>
                End Time:
              </label>
              <input
                className="app-select-field"
                type="time"
                id={`endTime-${index}`}
                value={schedule.endTime}
                onChange={(e) =>
                  handleScheduleChange(index, "endTime", e.target.value)
                }
                required
              />
            </div>
            <div className="app-input-container">
              <label
                className="app-input-label"
                htmlFor={`redDuration-${index}`}
              >
                Red Duration (seconds):
              </label>
              <input
                className="app-input-field"
                type="number"
                id={`redDuration-${index}`}
                value={schedule.redDuration}
                onChange={(e) =>
                  handleScheduleChange(index, "redDuration", parseInt(e.target.value))
                }
                required
              />
            </div>
            <div className="app-input-container">
              <label
                className="app-input-label"
                htmlFor={`yellowDuration-${index}`}
              >
                Yellow Duration (seconds):
              </label>
              <input
                className="app-input-field"
                type="number"
                id={`yellowDuration-${index}`}
                value={schedule.yellowDuration}
                onChange={(e) =>
                  handleScheduleChange(index, "yellowDuration", parseInt(e.target.value))
                }
                required
              />
            </div>
            <div className="app-input-container">
              <label
                className="app-input-label"
                htmlFor={`greenDuration-${index}`}
              >
                Green Duration (seconds):
              </label>
              <input
                className="app-input-field"
                type="number"
                id={`greenDuration-${index}`}
                value={schedule.greenDuration}
                onChange={(e) =>
                  handleScheduleChange(index, "greenDuration", parseInt(e.target.value))
                }
                required
              />
            </div>
          </div>
          <button
            style={{ marginTop: "20px", alignSelf: "center" }}
            type="button"
            className="app-main-button"
            onClick={() => handleRemoveSchedule(index)}
          >
            Remove Schedule
          </button>
        </div>
      ))}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <button className="app-main-button" type="button" onClick={handleAddSchedule}>
          Add Schedule
        </button>
        <button className="app-main-button" type="submit">
          Save Traffic Light
        </button>
      </div>
    </form>
  );
}

export default TrafficLightEdit;
