import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  TrafficLightSchedule,
  updateTrafficLightColor,
} from "../store/trafficSlice";

export default function useTrafficLight(lightId: number) {
  const trafficLight = useAppSelector((state) =>
    state.trafficLight.trafficLights.find((light) => light.id === lightId)
  );
  const dispatch = useAppDispatch();
  const colors = ["red", "yellow", "green"];
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0); // Index of current color

  useEffect(() => {
    if (!trafficLight) return;
    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let currentColorDuration = 0;

      trafficLight.schedules.forEach((schedule: TrafficLightSchedule) => {
        const startTimeParts = schedule.startTime.split(":");
        const endTimeParts = schedule.endTime.split(":");
        const startHour = parseInt(startTimeParts[0], 10);
        const startMinute = parseInt(startTimeParts[1], 10);
        const endHour = parseInt(endTimeParts[0], 10);
        const endMinute = parseInt(endTimeParts[1], 10);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        if (
          currentTotalMinutes >= startTotalMinutes &&
          currentTotalMinutes < endTotalMinutes
        ) {
          currentColor = trafficLight.currentColor;
          currentColorDuration =
            schedule[`${currentColor.toLowerCase()}Duration`] || 0;
        } else {
          currentColor = "yellow";
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        setCurrentColorIndex(colorIndex);
        setRemainingTime(currentColorDuration);
      }
    };

    calculateRemainingTime();

    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => {
        if (prevTime <= 1) {
          const nextColorIndex = (currentColorIndex + 1) % colors.length;
          const nextColor = colors[nextColorIndex];

          setCurrentColorIndex(nextColorIndex);
          dispatch(updateTrafficLightColor({ id: lightId, color: nextColor }));

          let nextColorDuration = 0;
          trafficLight.schedules.forEach((schedule: TrafficLightSchedule) => {
            nextColorDuration =
              schedule[`${nextColor.toLowerCase()}Duration`] || 0;
          });

          return nextColorDuration;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentColorIndex]);

  return { currentColorIndex, remainingTime, trafficLight };
}
