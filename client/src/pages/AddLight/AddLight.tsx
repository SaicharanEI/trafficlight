import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTrafficLight } from "../../store/trafficSlice";

const AddTrafficLightForm = () => {
  const dispatch = useAppDispatch();

  const [location, setLocation] = useState<string>("");
  const [color, setColor] = useState<string>("red");
  const [duration, setDuration] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const newTrafficLight = {
      id: Date.now(),
      location,
      color,
      duration: duration * 60,
    };

    dispatch(addTrafficLight(newTrafficLight));

    setLocation("");
    setColor("red");
    setDuration(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <label htmlFor="duration">Duration:</label>
      <input
        type="number"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
      />
      <label htmlFor="color">Color:</label>
      <select
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
      </select>

      <button type="submit">Add Traffic Light</button>
    </form>
  );
};

export default AddTrafficLightForm;
