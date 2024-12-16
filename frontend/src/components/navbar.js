import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Button, Typography, List, ListItem, Divider, IconButton, Tooltip } from '@mui/material';
import { FaBell } from 'react-icons/fa';

function Navbar() {
  const [selectedSection, setSelectedSection] = useState('student');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminjwt');
    const teacherToken = localStorage.getItem('teacherjwt');

    setIsAdmin(!!adminToken);
    setIsTeacher(!!teacherToken);

    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://timetable-routine-2.onrender.com/notification');
        const data = await response.json();
        setNotifications(data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    switch (section) {
      case 'student':
        navigate('/');
        break;
      case 'teacher':
        navigate('/teacherlogin');
        break;
      case 'addTeacher':
        navigate('/teacherregister');
        break;
      case 'addClass':
        navigate('/createClass');
        break;
      case 'home':
        navigate('/adminhome');
        break;
      case 'admin':
        navigate('/adminlogin')
      default:
        break;
    }
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('adminjwt');
    setIsAdmin(false);
    navigate('/adminlogin');
  };

  const handleLogoutTeacher = () => {
    localStorage.removeItem('teacherjwt');
    localStorage.removeItem('teacherId');
    setIsTeacher(false);
    navigate('/teacherlogin');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const openDetailsModal = (notification) => {
    setSelectedNotification(notification);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedNotification(null);
  };

  const isLoggedInAdmin = localStorage.getItem('adminjwt') !== null;
  const isLoggedInTeacher = localStorage.getItem('teacherjwt') !== null;

  return (
    <div className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Timetable</div>

        <div className="space-x-4 flex items-center">
  
          <div className="relative">
            <Tooltip title="Notifications">
              <IconButton onClick={toggleDropdown}>
                <FaBell className="text-2xl text-yellow-400" />
              </IconButton>
            </Tooltip>
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
            )}


            {dropdownOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  width: '300px',
                  bgcolor: 'white',
                  boxShadow: 3,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                <List>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <ListItem
                        key={notification._id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body2" color="text.primary">
                          {notification.message}
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => openDetailsModal(notification)}
                        >
                          Details
                        </Button>
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                      No notifications available.
                    </Typography>
                  )}
                </List>
              </Box>
            )}
          </div>

          {!isLoggedInAdmin && !isLoggedInTeacher && (
            <>
              <button
                className={`px-4 py-2 rounded ${selectedSection === 'student' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
                onClick={() => handleSectionChange('student')}
              >
                Student
              </button>
              <button
                className={`px-4 py-2 rounded ${selectedSection === 'teacher' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
                onClick={() => handleSectionChange('teacher')}
              >
                Teacher
              </button>
              <button
                className={`px-4 py-2 rounded ${selectedSection === 'admin' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
                onClick={() => handleSectionChange('admin')}
              >
                Admin
              </button>
            </>
          )}

          {isLoggedInAdmin && (
            <>
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-blue-600"
                onClick={() => handleSectionChange('home')}
              >
                Home
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-blue-600"
                onClick={() => handleSectionChange('addTeacher')}
              >
                Add Teacher
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-blue-600"
                onClick={() => handleSectionChange('addClass')}
              >
                Add Class
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogoutAdmin}
              >
                Logout (Admin)
              </button>
            </>
          )}

          {isLoggedInTeacher && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleLogoutTeacher}
            >
              Logout (Teacher)
            </button>
          )}
        </div>
      </div>

      {selectedNotification && (
        <Modal open={detailsModalOpen} onClose={closeDetailsModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedNotification.message}
            </Typography>
            <Divider />
            <List>
              {selectedNotification.details.map((detail) => (
                <ListItem key={detail._id}>
                  <Typography variant="body2">{detail.message}</Typography>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={closeDetailsModal}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Navbar;
