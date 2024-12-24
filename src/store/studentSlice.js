<<<<<<< HEAD
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudents } from '../apiServices';
=======
<<<<<<< HEAD
// src/store/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudents } from '../apiService';
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudents } from '../apiServices';
>>>>>>> 33e68cd (commit at 1.27 pm)
>>>>>>> new-branch

export const fetchStudentsThunk = createAsyncThunk('students/fetchStudents', async ({ year, course }) => {
  const response = await fetchStudents(year, course);
  return response;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStudentsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

<<<<<<< HEAD
export default studentSlice.reducer;
=======
<<<<<<< HEAD
export default studentSlice.reducer;
=======
export default studentSlice.reducer;
>>>>>>> 33e68cd (commit at 1.27 pm)
>>>>>>> new-branch
