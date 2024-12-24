import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentsThunk } from '../store/studentSlice';
import { createStudent, deleteStudents, updateStudent, fetchCourses } from '../apiServices';

function MainContent() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.data);
  const studentStatus = useSelector(state => state.students.status);
  const error = useSelector(state => state.students.error);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cohort: '',
    dateJoined: '',
    lastLogin: new Date().toISOString(),
    courses: [],
  });
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    dispatch(fetchStudentsThunk({ year: selectedYear, course: selectedCourse }));
  }, [selectedYear, selectedCourse, dispatch]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response);
      }catch(error){
        console.error("Error fetching courses: ",error);
      }
    };
    getCourses();
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    setFormData({
      ...formData,
      courses: Array.from(e.target.selectedOptions, option => Number(option.value)),
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toISOString();
    const updatedFormData = {
      ...formData,
      lastLogin: currentDateTime,
    };
    try {
      await createStudent(updatedFormData);
      dispatch(fetchStudentsThunk({ year: selectedYear, course: selectedCourse }));
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]); 
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudents(selectedRows);
      dispatch(fetchStudentsThunk({ year: selectedYear, course: selectedCourse }));
      setIsRemoving(false);
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedStudentData = {
        ...formData,
        lastLogin: new Date().toISOString(),
      };
      await updateStudent(selectedRows[0], updatedStudentData);
      dispatch(fetchStudentsThunk({ year: selectedYear, course: selectedCourse }));
      setIsUpdating(false);
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded m-2 p-4 shadow-md shadow-slate-500">
      {studentStatus === 'loading' && <div>Loading...</div>}
      {studentStatus === 'failed' && <div>Error: {error}</div>}
      <div className="flex justify-between mb-4">
        <div>
          <select 
            className="bg-gray-100 text-gray-500 p-2 rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2024">AY 2024-25</option>
            <option value="2023">AY 2023-24</option>
          </select>
          <select 
            className="bg-gray-100 text-gray-500 p-2 rounded ml-2"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            <option value="CBSE 9-Science">CBSE 9-Science</option>
            <option value="CBSE 9-Math">CBSE 9-Math</option>
            <option value="CBSE 10-Science">CBSE 10-Science</option>
            <option value="CBSE 10-Math">CBSE 10-Math</option>
          </select>
        </div>
        <div>
          <button 
            className="bg-blue-500 text-white p-2 rounded" 
            onClick={() => {
              setFormData({
                ...formData,
                lastLogin: new Date().toISOString(), 
              });
              setShowForm(true);
            }}
          >
            Add Student
          </button>
          <button 
            className="bg-red-500 text-white p-2 rounded ml-2" 
            onClick={() => setIsRemoving(!isRemoving)}
          >
            Remove Student
          </button>
          <button 
            className="bg-green-500 text-white p-2 rounded ml-2" 
            onClick={() => setIsUpdating(!isUpdating)}
          >
            Update Student
          </button>
        </div>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-gray-100 text-black p-4 rounded shadow-md">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">Add Student</h2>
            <button
              className="bg-gray-500 text-white p-2 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Student Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter student name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cohort">
              Academic Year
            </label>
            <select 
              id="cohort" 
              name="cohort" 
              value={formData.cohort} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
              required
            >
              <option value="">Select Academic Year</option>
              <option value="AY 2023-24">AY 2023-24</option>
              <option value="AY 2024-25">AY 2024-25</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courses">
              Courses
            </label>
            <select 
              id="courses" 
              name="courses" 
              value={formData.courses} 
              onChange={handleCourseChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
              multiple
              required
            >
            {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
            ))}
            </select>

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateJoined">
              Date Joined
            </label>
            <input 
              type="date" 
              id="dateJoined" 
              name="dateJoined" 
              value={formData.dateJoined} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastLogin">
              Last Login
            </label>
            <input 
              type="text" 
              id="lastLogin" 
              name="lastLogin" 
              value={new Date(formData.lastLogin).toLocaleString()} 
              readOnly 
              className="bg-gray-200 border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {isRemoving && (
  <div className="flex justify-between mt-4">
    <button 
      className="bg-red-500 text-white p-2 rounded" 
      onClick={handleDelete}
    >
      Delete Selected
    </button>
    <button 
      className="bg-gray-500 text-white p-2 rounded" 
      onClick={() => {
        setIsRemoving(false);
        setSelectedRows([]);
      }}
    >
      Cancel
    </button>
  </div>
)}
{isUpdating && (
  <div className="flex justify-between mt-4">
    <button 
      className="bg-green-500 text-white p-2 rounded" 
      onClick={handleUpdate}
    >
      Save Changes
    </button>
    <button 
      className="bg-gray-500 text-white p-2 rounded" 
      onClick={() => {
        setIsUpdating(false);
        setSelectedRows([]);
      }}
    >
      Cancel
    </button>
  </div>
)}
<table className="w-full text-black">
  <thead>
    <tr className="shadow-md">
      {(isRemoving || isUpdating) && <th className="p-2 text-left">Select</th>}
      <th className="p-2 text-left">Student Name</th>
      <th className="p-2 text-left">Cohort</th>
      <th className="p-2 text-left">Courses</th>
      <th className="p-2 text-left">Date Joined</th>
      <th className="p-2 text-left">Last Login</th>
      <th className="p-2 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    {students.map(student => (
      <tr 
        className={`shadow-md ${isUpdating && !selectedRows.includes(student.id) ? 'opacity-50' : ''}`} 
        key={student.id}
      >
        {(isRemoving || isUpdating) && (
          <td className="p-2">
            <input
              type="checkbox"
              checked={selectedRows.includes(student.id)}
              onChange={() => handleRowSelect(student.id)}
            />
          </td>
        )}
        <td className="p-2">
          {isUpdating && selectedRows.includes(student.id) ? (
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            student.name
          )}
        </td>
        <td className="p-2">
          {isUpdating && selectedRows.includes(student.id) ? (
            <select 
              name="cohort" 
              value={formData.cohort} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
            >
              <option value="AY 2023-24">AY 2023-24</option>
              <option value="AY 2024-25">AY 2024-25</option>
            </select>
          ) : (
            student.cohort
          )}
        </td>
        <td className="p-2">
          {isUpdating && selectedRows.includes(student.id) ? (
            <select 
              name="courses" 
              value={formData.courses} 
              onChange={handleCourseChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
              multiple
            >
              <option value="CBSE 9-Science">CBSE 9-Science</option>
              <option value="CBSE 9-Math">CBSE 9-Math</option>
              <option value="CBSE 10-Science">CBSE 10-Science</option>
              <option value="CBSE 10-Math">CBSE 10-Math</option>
            </select>
          ) : (
            student.courses.map(course => `${course.name} ${course.image}`).join(', ')
          )}
        </td>
        <td className="p-2">
          {isUpdating && selectedRows.includes(student.id) ? (
            <input 
              type="date" 
              name="dateJoined" 
              value={formData.dateJoined} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            new Date(student.dateJoined).toLocaleDateString()
          )}
        </td>
        <td className="p-2">
          {isUpdating && selectedRows.includes(student.id) ? (
            <input 
              type="datetime-local" 
              name="lastLogin" 
              value={formData.lastLogin} 
              onChange={handleInputChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            new Date(student.lastLogin).toLocaleString()
          )}
        </td>
        <td className="p-2">
          <span className={`inline-block h-2 w-2 ${student.status ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  );
}
export default MainContent;