import { NextFunction, Request, Response } from "express";
import { prismaCilent } from "..";
import { TrafficLightSchema } from "../schema/trafficlight";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";

export const AddTrafficLight = async (req: Request, res: Response) => {
  const parsedBody = TrafficLightSchema.parse(req.body);
  const { name, location, currentColor, schedules } = parsedBody;
  const trafficlight = await prismaCilent.trafficLight.create({
    data: {
      name,
      location,
      currentColor,
      schedules: {
        create: schedules,
      },
    },
    include: {
      schedules: true, // Include schedules in the response
    },
  });

  res.status(201).json({
    message: "Traffic light created successfully",
    data: trafficlight,
  });
};

export const updateTrafficLight = async (req: Request, res: Response,next: NextFunction) => {
  const { id } = req.params;
  const trafficLightId = Number(id);
  const { name, location, currentColor, schedules } = req.body;
  try{
  await prismaCilent.trafficLight.update({
    where: { id: trafficLightId },
    data: { name, location, currentColor },
  });

  // Update schedules
  for (const schedule of schedules) {
    if (schedule.id !== undefined) {
      await prismaCilent.trafficLightSchedule.update({
        where: { id: schedule.id },
        data: {
          timePeriod: schedule.timePeriod,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          redDuration: schedule.redDuration,
          yellowDuration: schedule.yellowDuration,
          greenDuration: schedule.greenDuration,
        },
      });
    } else {
      await prismaCilent.trafficLightSchedule.create({
        data: {
          timePeriod: schedule.timePeriod,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          redDuration: schedule.redDuration,
          yellowDuration: schedule.yellowDuration,
          greenDuration: schedule.greenDuration,
          trafficLightId: trafficLightId,
        },
      });
    }
  }

  // Fetch the updated traffic light with the latest schedules
  const trafficLightWithSchedules = await prismaCilent.trafficLight.findUnique({
    where: { id: trafficLightId },
    include: {
      schedules: {
        where: {
          status: false,
        },
      },
    },
  });

  res.status(200).json({
    message: "Traffic light updated successfully",
    data: trafficLightWithSchedules,
  });
}
  catch (error : any) {
    next (new NotFoundException("Traffic light not found", ErrorCode.LIGHT_NOT_FOUND))
  }
};

export const DeleteTrafficLight = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const trafficlight = await prismaCilent.trafficLight.update({
      where: {
        id: Number(id),
      },
      data: {
        status: true,
      },
    });
    res.status(200).json({
      message: "Traffic light deleted successfully",
      trafficlight,
    });
  } catch (error : any) {
    next (new NotFoundException("Traffic light not found", ErrorCode.LIGHT_NOT_FOUND))
  }
};

export const getTrafficLight = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const trafficlight = await prismaCilent.trafficLight.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        schedules: {
          where: {
            status: false,
          },
        },
      },
    });
    res.status(200).json({ data: trafficlight });
  } catch (error : any) {
    next (new NotFoundException("Traffic light not found", ErrorCode.LIGHT_NOT_FOUND))

  }
};

export const getTrafficLightsList = async (req: Request, res: Response) => {
  const trafficlights = await prismaCilent.trafficLight.findMany({
    where: {
      status: false,
    },
    include: {
      schedules: {
        where: {
          status: false,
        },
      },
    },
  });
  res.status(200).json({ data: trafficlights });
};

export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const schedule = await prismaCilent.trafficLightSchedule.update({
      where: {
        id: Number(id),
      },
      data: {
        status: true,
      },
    });
    res.status(200).json({
      message: "Schedule deleted successfully",
      schedule,
    });
  } catch (error: any) {
    next (new NotFoundException("Traffic light not found", ErrorCode.LIGHT_NOT_FOUND))
  }
};

// export const updateTrafficLightCurrentColor = async (
//   req: Request,
//   res: Response
// ) => {
//   const { id } = req.params;
//   const { currentColor } = req.body;
//   const trafficlight = await prismaCilent.trafficLight.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       currentColor,
//     },
//   });
//   res.status(200).json({
//     message: "Traffic light updated successfully",
//     data: trafficlight,
//   });
// };
