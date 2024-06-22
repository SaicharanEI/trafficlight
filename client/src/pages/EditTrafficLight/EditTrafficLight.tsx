import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { TrafficLight, updateTrafficLight, TrafficLightSchedule } from '../../store/trafficSlice';

const TrafficLightEdit = () => {
  const { id } = useParams<{ id: string }>();
//   const history = useHistory();
  const dispatch = useAppDispatch();
  const trafficLight = useAppSelector(
    (state) => state.trafficLight.trafficLights.find(light => light.id === Number(id))
  );

  const [location, setLocation] = useState<string>('');
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);

  useEffect(() => {
    if (trafficLight) {
      setLocation(trafficLight.location);
      setSchedules(trafficLight.schedules);
    }
  }, [trafficLight]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (trafficLight) {
      const updatedTrafficLight: TrafficLight = {
        ...trafficLight,
        location,
        schedules,
      };

      dispatch(updateTrafficLight(updatedTrafficLight));
    //   history.push(`/traffic-light/${id}`); // Navigate back to details page
    }
  };

  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      {
        timePeriod: '',
        startTime: '',
        endTime: '',
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

  if (!trafficLight) {
    return <div>Traffic light not found</div>;
  }

  return (
    <div>
      <h2>Edit Traffic Light</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <div>
          <h3>Schedules:</h3>
          {schedules.map((schedule, index) => (
            <div key={index}>
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
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default TrafficLightEdit;
