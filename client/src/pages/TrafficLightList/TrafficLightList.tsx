import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { TrafficLight } from "../../store/trafficSlice";

const TrafficLightList = () => {
  let trafficLights: TrafficLight[] = [];
  useEffect(() => {
    trafficLights = useAppSelector(
      (state) => state.trafficLights.trafficLights
    );
    console.log(trafficLights, "fetcheddata");
  }, [trafficLights]);

  return (
    <div>
      <h2>Traffic Light List</h2>
      <ul>
        {trafficLights.map((light: TrafficLight) => (
          <li key={light.id}>
            <div>Location: {light.location}</div>
            <div>Color: {light.color}</div>
            <div>Duration: {light.duration} seconds</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficLightList;
