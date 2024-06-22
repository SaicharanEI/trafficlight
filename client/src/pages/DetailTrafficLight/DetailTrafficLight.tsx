import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateTrafficLightColor, TrafficLight, TrafficLightSchedule } from '../../store/trafficSlice';

const TrafficLightDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const trafficLight = useAppSelector((state) =>
    state.trafficLight.trafficLights.find((light) => light.id === Number(id))
  );
  const colors = ['red', 'yellow', 'green'];

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0); // Index of current color

  useEffect(() => {
    if (!trafficLight) return;
    // Function to calculate remaining time and handle color change
    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;

      let currentColor = '';
      let currentColorDuration = 0;

      trafficLight.schedules.forEach((schedule: TrafficLightSchedule) => {
        const startTimeParts = schedule.startTime.split(':');
        const endTimeParts = schedule.endTime.split(':');
        const startHour = parseInt(startTimeParts[0], 10);
        const startMinute = parseInt(startTimeParts[1], 10);
        const endHour = parseInt(endTimeParts[0], 10);
        const endMinute = parseInt(endTimeParts[1], 10);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        if (currentTotalMinutes >= startTotalMinutes && currentTotalMinutes < endTotalMinutes) {
          currentColor = trafficLight.currentColor; // Ensure you're using currentColor from trafficLight
          currentColorDuration = schedule[`${currentColor.toLowerCase()}Duration`] || 0;
        console.log('currentColorDuration', currentColorDuration, currentColor)
        }else{
            currentColor = "yellow"
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        setCurrentColorIndex(colorIndex);
        setRemainingTime(currentColorDuration);
      }
    };

    // Initial call to calculate remaining time and current color
    calculateRemainingTime();

    // Interval to update remaining time and switch colors
    const interval = setInterval(() => {
        
        
        
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          const nextColorIndex = (currentColorIndex + 1) % colors.length;
          const nextColor = colors[nextColorIndex];
        console.log('nextColor', nextColor)
          setCurrentColorIndex(nextColorIndex);
          dispatch(updateTrafficLightColor({ id: Number(id), color: nextColor }));

          let nextColorDuration = 0;
          trafficLight.schedules.forEach((schedule: TrafficLightSchedule) => {
            
              nextColorDuration = schedule[`${nextColor.toLowerCase()}Duration`] || 0;
            console.log('nextColorDuration', nextColorDuration)
            
          });

          return nextColorDuration;
        } else {
            // console.log('prevTime', prevTime-1)
          return prevTime - 1; // Decrease remaining time by 1 second
        }
      });
    }, 1000);

    // Clear interval on component unmount or when traffic light changes
    return () => clearInterval(interval);
  }, []);

  if (!trafficLight) {
    return <div>Traffic light not found</div>;
  }

  return (
    <div>
      <h2>Traffic Light Details</h2>
      <div>Location: {trafficLight.location}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {colors.map((color, index) => (
          <div
            key={color}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: index === currentColorIndex ? color : getLightColor(color),
            }}
          />
        ))}
        <div
          style={{
            width: '70px',
            height: '70px',
            color: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 'bold',
            marginTop: '10px',
            border: '2px solid red',
            borderRadius: '5px',
          }}
        >
          {remainingTime}
        </div>
      </div>
    </div>
  );
};

const getLightColor = (color: string) => {
  switch (color) {
    case 'red':
      return 'lightcoral';
    case 'yellow':
      return 'khaki'; // Lighter yellow
    case 'green':
      return 'lightgreen';
    default:
      return 'lightgray';
  }
};

export default TrafficLightDetail;
