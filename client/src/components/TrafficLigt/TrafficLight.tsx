import ScheduleComponent from "../Schedules/Schedule";

export default function TrafficLightComponent({
  handleSubmit,
  name,
  location,
  schedules,
  handleScheduleChange,
  handleRemoveSchedule,
  handleAddSchedule,
  setName,
  setLocation,
  heading,
}: any) {
  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h1 className="app-main-heading">{heading}</h1>
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
      {schedules.map((schedule: any, index: number) => (
        <ScheduleComponent
          schedule={schedule}
          index={index}
          handleScheduleChange={handleScheduleChange}
          handleRemoveSchedule={handleRemoveSchedule}
        />
      ))}
      <button
        style={{ marginTop: "20px", alignSelf: "center" }}
        type="button"
        className="app-main-button"
        onClick={handleAddSchedule}
      >
        Add Schedule
      </button>
      <button
        style={{ marginTop: "20px", alignSelf: "center" }}
        type="submit"
        className="app-main-button"
      >
        {heading}
      </button>
    </form>
  );
}
