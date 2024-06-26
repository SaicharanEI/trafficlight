import { useParams } from "react-router-dom";
import useTrafficLight from "../../utils/UseTrafficLight";
import "./DetailTrafficLight.css";

function TrafficLightDetail() {
  const lightId = Number(useParams<{ id: string }>().id);
  const { remainingTime, currentColorIndex, trafficLight, onClickUpdateColor } =
    useTrafficLight(lightId);
  console.log(remainingTime, currentColorIndex, trafficLight);

  if (!trafficLight) {
    return <div>Traffic Light not found</div>;
  }

  const colors = ["red", "yellow", "green"];

  return (
    <div className="detail-traffic-light">
      <h1 className="app-main-heading">Traffic Light Details</h1>
      <h2 className="app-main-heading"> {trafficLight.location}</h2>
      <div className="detail-traffic-light-colors-container">
        {colors.map((color, index) => (
          <div
            onClick={() => onClickUpdateColor(index)}
            className="detail-traffic-light-color"
            key={color}
            style={{
              backgroundColor: index === currentColorIndex ? color : "grey",
            }}
          />
        ))}
        <div className="detail-traffic-light-time">{remainingTime}</div>
      </div>
    </div>
  );
}

export default TrafficLightDetail;
