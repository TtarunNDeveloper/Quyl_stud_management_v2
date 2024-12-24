import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

<<<<<<< HEAD
export default store;
=======
export default store;
>>>>>>> 33e68cd (commit at 1.27 pm)
