import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrafficLight {
  id: number;
  location: string;
  color: string;
  duration: number;
}

interface TrafficLightsState {
  trafficLights: TrafficLight[];
}

const initialState: TrafficLightsState = {
  trafficLights: [],
};

const trafficLightSlice = createSlice({
  name: 'trafficLights',
  initialState,
  reducers: {
    addTrafficLight: (state, action: PayloadAction<TrafficLight>) => {
      state.trafficLights.push(action.payload);
    },
  },
});

export const { addTrafficLight } = trafficLightSlice.actions;
export default trafficLightSlice.reducer;
