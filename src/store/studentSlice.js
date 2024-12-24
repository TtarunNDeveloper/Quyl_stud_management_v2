import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudents } from '../apiServices';


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

export default studentSlice.reducer;

