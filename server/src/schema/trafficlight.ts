import {z} from "zod"
export const TrafficLightScheduleSchema = z.object({
    timePeriod: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    redDuration: z.number(),
    yellowDuration: z.number(),
    greenDuration: z.number(),
  });
  
  export const TrafficLightSchema = z.object({
    name: z.string(),
    location: z.string(),
    currentColor: z.string(),
    schedules: z.array(TrafficLightScheduleSchema),
  });