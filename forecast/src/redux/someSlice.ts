import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  CurrentWeatherTemperature, SomeSliceState, WeeklyForecast } from './types';

// Define your slice state type


// Initial state
const initialState: SomeSliceState = {
    cityName: '',
    CurrentWeatherTemperature: {
            Metric: { Value: 0, Unit: 'C' },
            Imperial: { Value: 0, Unit: 'F' },
    },
    weeklyForecast:
    {
        responseImperial: {
            DailyForecasts: []
        },
        responseMetric: {
            DailyForecasts: []
        },
    },
    tempChoice: 'C',
    weatherText: 'Sunny',
    key:0
};


// Create slice
const someSlice = createSlice({
    name: 'someSlice',
    initialState,
    reducers: {
        setCurrentWeatherTemperature: (state, action: PayloadAction<CurrentWeatherTemperature>) => {
            state.CurrentWeatherTemperature = action.payload;
        },
        setWeeklyForecast: (state, action: PayloadAction<WeeklyForecast>) => {
            state.weeklyForecast = action.payload;
        },
        setTempChoice: (state, action: PayloadAction<string>) => {
            state.tempChoice = action.payload;
        },
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload;
        },
        setWeatherText: (state, action: PayloadAction<string>) => {
            state.weatherText = action.payload;
        },
        setCurrentKey: (state, action: PayloadAction<number | boolean>) => {
            state.key = action.payload;
        },
    }
})


// Export actions and reducer
export const { setCurrentWeatherTemperature, setWeeklyForecast, setTempChoice, setCityName, setWeatherText,setCurrentKey } = someSlice.actions;
export default someSlice.reducer;
