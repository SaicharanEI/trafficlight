import { Request, Response } from "express";
import { prismaCilent } from "..";
import { TrafficLightSchema } from "../schema/trafficlight";

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

// export const updateTrafficLight = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const parsedBody = req.body;

//   try {
//     const { name, location, currentColor, schedules } = parsedBody;

//     const updateSchedule = schedules.map((schedule: any) => async () => {
//       if (schedule.id) {
//         await prismaCilent.trafficLightSchedule.update({
//           where: { id: schedule.id },
//           data: { ...schedule },
//         });
//       } else {
//         await prismaCilent.trafficLightSchedule.create({
//           data: { ...schedule, trafficLightId: Number(id) },
//         });
//       }
//     });
//     const updatedTrafficLight = await prismaCilent.trafficLight.update({
//       where: {
//         id: Number(id),
//       },
//       data: {
//         name,
//         location,
//         currentColor,
//       },
//       include: {
//         schedules: true,
//       },
//     });

//     res.status(200).json({
//       message: "Traffic light updated successfully",
//       data: updatedTrafficLight,
//     });
//   } catch (error) {
//     console.error("Error updating traffic light:", error);
//     res.status(500).json({ message: "Failed to update traffic light" });
//   }
// };

// data: {
//     name,
//     location,
//     currentColor,
//     schedules: {
//       upsert: schedules.map((schedule: any) => ({
//         where: { id: schedule.id || '' },
//         create: {
//           ...schedule,
//           trafficLightId: Number(id),
//         },
//         update: {
//           ...schedule,
//         },
//       })),
//     },
//   },



export const updateTrafficLight = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, location, currentColor, schedules } = req.body;

  try {
    // Update traffic light
    const updatedTrafficLight = await prismaCilent.trafficLight.update({
      where: { id: Number(id) },
      data: {
        name,
        location,
        currentColor,
        schedules: {
          upsert: schedules.map((schedule: any) => ({
            where: { id: schedule.id || undefined },
            create: { ...schedule, trafficLightId: Number(id) },
            update: { ...schedule },
          })),
        },
      },
      include: {
        schedules: true,
      },
    });

    res.status(200).json({
      message: "Traffic light updated successfully",
      data: updatedTrafficLight,
    });
  } catch (error) {
    console.error("Error updating traffic light:", error);
    res.status(500).json({ message: "Failed to update traffic light" });
  }
};


export const DeleteTrafficLight = async (req: Request, res: Response) => {
  const { id } = req.params;

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
};

export const getTrafficLight = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id, "id called");
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
};

export const getTrafficLights = async (req: Request, res: Response) => {
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

export const updateTrafficLightCurrentColor = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { currentColor } = req.body;
  console.log(currentColor, id);
  const trafficlight = await prismaCilent.trafficLight.update({
    where: {
      id: Number(id),
    },
    data: {
      currentColor,
    },
  });
  console.log(trafficlight);
  res.status(200).json({
    message: "Traffic light updated successfully",
    data: trafficlight,
  });
};

export const deleteSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id, "id called delete schedule");
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
};
