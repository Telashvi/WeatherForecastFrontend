import { combineReducers } from 'redux';
import someSlice from './someSlice';

export const rootReducer = combineReducers({
  someSlice: someSlice,
  // Add more slices as needed
});
