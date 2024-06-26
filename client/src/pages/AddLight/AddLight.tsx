import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
import { TrafficLightSchedule } from "../../store/trafficSlice";
// import Toast from "../../utils/Toast";
import "../../App.css";

import useFetch from "../../utils/service";
function AddTrafficLightForm() {
  // const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);
  const { fetchData, state } = useFetch();
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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const newTrafficLight = {
      name,
      currentColor: "red",
      location,
      schedules,
    };

    await fetchData("addtrafficlight", "POST", newTrafficLight);
  };

  useEffect(() => {
    if (state) {
      if (state.error === null && state.data && !state.loading) {
        setName("");
        setLocation("");
        setSchedules([]);
      }
    }
  }, [state.data]);

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h1 className="app-main-heading">Add Traffic Light</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
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
              <label
                className="app-input-label"
                htmlFor={`timePeriod-${index}`}
              >
                Time Period:
              </label>
              <input
                className="app-input-field"
                type="text"
                id={`timePeriod-${index}`}
                value={schedule.timePeriod}
                onChange={(e) =>
                  setSchedules((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, timePeriod: e.target.value }
                        : item
                    )
                  )
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
                  setSchedules((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, startTime: e.target.value }
                        : item
                    )
                  )
                }
                required
              />
            </div>
            <div className="app-input-container">
              <label htmlFor={`endTime-${index}`}>End Time:</label>

              <input
                className="app-select-field"
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
                  setSchedules((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, redDuration: parseInt(e.target.value) }
                        : item
                    )
                  )
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
                  setSchedules((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, yellowDuration: parseInt(e.target.value) }
                        : item
                    )
                  )
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
                  setSchedules((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, greenDuration: parseInt(e.target.value) }
                        : item
                    )
                  )
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
        <button
          className="app-main-button"
          type="button"
          onClick={handleAddSchedule}
        >
          Add Schedule
        </button>

        <button className="app-main-button" type="submit">
          Add Traffic Light
        </button>
      </div>
    </form>
  );
}

export default AddTrafficLightForm;
