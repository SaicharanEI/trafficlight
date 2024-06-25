import { Router } from "express";
import { AddTrafficLight, DeleteTrafficLight, deleteSchedule, getTrafficLight, getTrafficLights, updateTrafficLight, updateTrafficLightCurrentColor } from "../controllers/trafficControllers";
import { errorHandler } from "../error-handler";

export const trafficRoute: Router = Router();

trafficRoute.post("/addtrafficlight", errorHandler(AddTrafficLight))
trafficRoute.put("/updatetrafficlight/:id", errorHandler(updateTrafficLight))
trafficRoute.get("/trafficlights", errorHandler(getTrafficLights))
trafficRoute.get("/trafficlight/:id", errorHandler(getTrafficLight))
trafficRoute.put("/updatetrafficlightcolor/:id", errorHandler(updateTrafficLightCurrentColor))
trafficRoute.delete("/deleteschedule/:id", errorHandler(deleteSchedule))
trafficRoute.delete(`/deletetrafficlight/:id`, errorHandler(DeleteTrafficLight))
trafficRoute.get("/traffic", (req,res) => {res.send("Hello World from traffic route")})