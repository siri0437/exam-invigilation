import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'Network error' };
  }
};

export const fetchSchedule = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE}/schedule`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Fetch schedule error:', error);
    return [];
  }
};

export const uploadTeacherTimetable = async (file) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE}/upload/teacher`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload teacher timetable error:', error);
    return { message: 'Network error' };
  }
};

export const uploadExamTimetable = async (file) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE}/upload/exam`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload exam timetable error:', error);
    return { message: 'Network error' };
  }
};

export const generateSchedule = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE}/upload/generate`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Generate schedule error:', error);
    return { message: 'Network error' };
  }
};
