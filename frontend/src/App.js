import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import CreateClass from './components/createClass'; 
import Home from './components/home';
import ClassDetails from './components/classRoutineDetails';
import AdminLogin from './components/adminLogin';
import TeacherLogin from './components/teacherLogin';
import AdminHome from './components/adminHome';
import TeacherRegister from './components/teacherRegister';
import TeacherHome from './components/teacherHome';
import EditClassDetails from './components/editClassDetails';
import UpdateClass from './components/updateClassDetails';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createclass" element={<CreateClass />} />
          <Route path="/classdetails" element={<ClassDetails />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/teacherlogin" element={<TeacherLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/teacherregister" element={<TeacherRegister />} />
          <Route path="/teacherhome" element={<TeacherHome />} />
          <Route path="/editclassdetails" element={<EditClassDetails />} />
          <Route path="/updateclass" element={<UpdateClass />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
