import { Route, Routes } from "react-router-dom";
import AddTrafficLightForm from "./pages/AddLight/AddLight";
import TrafficLightList from "./pages/TrafficLightList/TrafficLightList";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddTrafficLightForm />} />
      <Route path="/trafficlights" element={<TrafficLightList />} />
    </Routes>
  );
}

export default App;
