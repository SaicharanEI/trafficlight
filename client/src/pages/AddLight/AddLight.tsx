import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
import { TrafficLightSchedule } from "../../store/trafficSlice";
// import Toast from "../../utils/Toast";
import "../../App.css";
import useFetch from "../../utils/service";
import ScheduleComponent from "../../components/Schedules/Schedule";

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
        id: undefined,
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

  const handleScheduleChange = (
    index: number,
    field: keyof TrafficLightSchedule,
    value: string | number
  ) => {
    setSchedules((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
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
        <ScheduleComponent schedule={schedule} index={index} handleScheduleChange={handleScheduleChange} handleRemoveSchedule={handleRemoveSchedule} />
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
