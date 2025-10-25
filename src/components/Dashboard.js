import React, { useState, useEffect } from 'react';
import { fetchSchedule, uploadTeacherTimetable, uploadExamTimetable, generateSchedule } from '../api';

const Dashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [generatedSchedule, setGeneratedSchedule] = useState([]);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    const data = await fetchSchedule();
    setSchedule(data);
  };

  const handleUploadTeacher = async (e) => {
    e.preventDefault();
    const file = e.target.teacherFile.files[0];
    if (!file) return alert('Please select a file');
    const data = await uploadTeacherTimetable(file);
    alert(data.message);
  };

  const handleUploadExam = async (e) => {
    e.preventDefault();
    const file = e.target.examFile.files[0];
    if (!file) return alert('Please select a file');
    const data = await uploadExamTimetable(file);
    alert(data.message);
  };

  const handleGenerateSchedule = async () => {
    const data = await generateSchedule();
    alert(data.message);
    if (data.schedule) {
      setGeneratedSchedule(data.schedule);
    }
  };

  return (
    <div className="dashboard">
      <h2>Teacher Dashboard</h2>

      <h3>Upload Teacher Timetable</h3>
      <form onSubmit={handleUploadTeacher}>
        <input type="file" name="teacherFile" accept=".csv" required />
        <button type="submit">Upload</button>
      </form>

      <h3>Upload Exam Details</h3>
      <form onSubmit={handleUploadExam}>
        <input type="file" name="examFile" accept=".csv" required />
        <button type="submit">Upload</button>
      </form>

      <h3>Generate Schedule</h3>
      <button onClick={handleGenerateSchedule}>Generate</button>

      <h3>Generated Schedule</h3>
      {generatedSchedule.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Date</th>
              <th>Time</th>
              <th>Room</th>
              <th>Invigilators</th>
            </tr>
          </thead>
          <tbody>
            {generatedSchedule.map((s, index) => (
              <tr key={index}>
                <td>{s.exam}</td>
                <td>{s.date}</td>
                <td>{s.time}</td>
                <td>{s.room}</td>
                <td>{s.invigilators?.map(i => i.name).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schedule generated</p>
      )}

      <h3>Teacher Schedule</h3>
      {schedule.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, index) => (
              <tr key={index}>
                <td>{s.exam}</td>
                <td>{s.date}</td>
                <td>{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No schedule available</p>
          <p>Sample Schedule:</p>
          <table>
            <thead>
              <tr>
                <th>Exam</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Mathematics</td><td>2025-01-15</td><td>10:00 AM</td></tr>
              <tr><td>Physics</td><td>2025-01-16</td><td>2:00 PM</td></tr>
              <tr><td>Chemistry</td><td>2025-01-17</td><td>11:00 AM</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
