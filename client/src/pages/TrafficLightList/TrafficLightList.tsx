import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TrafficLight, deleteTrafficLight } from '../../store/trafficSlice';
import { Link } from 'react-router-dom';

const TrafficLightList = () => {
  const dispatch = useAppDispatch();
  const trafficLights: TrafficLight[] = useAppSelector(
    (state) => state.trafficLight.trafficLights
  );

  const handleDelete = (id: number) => {
    dispatch(deleteTrafficLight(id));
  };

  return (
    <div>
      <h2>Traffic Light List</h2>
      <ul>
        {trafficLights.map(({ id, name, location, schedules }: TrafficLight) => (
          <li key={id}>
            <div>Name: {name}</div>
            <div>Location: {location}</div>
            <div>
              Schedules:
              <ul>
                {schedules.map((schedule, index) => (
                  <li key={index}>
                    <div>Time Period: {schedule.timePeriod}</div>
                    <div>Start Time: {schedule.startTime}</div>
                    <div>End Time: {schedule.endTime}</div>
                    <div>Red Duration: {schedule.redDuration} seconds</div>
                    <div>Yellow Duration: {schedule.yellowDuration} seconds</div>
                    <div>Green Duration: {schedule.greenDuration} seconds</div>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <Link to={`/traffic-light/${id}`}>View Details</Link>
            {' | '}
            <Link to={`/traffic-light/edit/${id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficLightList;
