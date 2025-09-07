import Link from "next/link";
export default function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Students</h2>
          <p>Manage student information</p>
          <Link href="/teacher/students">View Students</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Assignments</h2>
          <p>Create and grade assignments</p>
          <Link href="/teacher/assignments">View Assignments</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Schedule</h2>
          <p>View your class schedule</p>
          <Link href="/teacher/schedule">View Schedule</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Messages</h2>
          <p>Communicate with students and parents</p>
          <Link href="/teacher/messages">View Messages</Link>
        </div>
      </div>
    </div>
  );
}