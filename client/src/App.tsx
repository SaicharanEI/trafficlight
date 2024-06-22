import { Route, Routes } from "react-router-dom";
import AddTrafficLightForm from "./pages/AddLight/AddLight";
import TrafficLightList from "./pages/TrafficLightList/TrafficLightList";
import "./App.css";
import TrafficLightDetail from "./pages/DetailTrafficLight/DetailTrafficLight";
import TrafficLightEdit from "./pages/EditTrafficLight/EditTrafficLight";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddTrafficLightForm />} />
      <Route path="/trafficlights" element={<TrafficLightList />} />
      <Route path="/traffic-light/:id" element={<TrafficLightDetail />} />
      <Route path="/traffic-light/edit/:id/" element={<TrafficLightEdit />} />
    </Routes>
  );
}

export default App;
