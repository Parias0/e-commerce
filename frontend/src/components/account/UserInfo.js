import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';


const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [newEmail, setNewEmail] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      UserService.getUserInfo(currentUser.token)
        .then(response => {
          setUserInfo(response.data);
          setNewEmail(response.data.email);
        })
        .catch(error => {
          console.error("Problem fetching user info:", error);
        });
    }
  }, [currentUser]);

  const handleEmailChange = () => {
    UserService.updateUserInfo({ ...userInfo, email: newEmail }, currentUser.token)
      .then(response => {
        setUserInfo(response.data);
        alert('Email updated successfully.');
      })
      .catch(error => {
        console.error("Problem updating email:", error);
      });
  };

  const handleChangePassword = () => {
    const passwordData = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword
    };

    UserService.changePassword(passwordData, currentUser.token)
      .then(() => {
        alert('Password changed successfully.');
        setPasswords({ oldPassword: '', newPassword: '' });
      })
      .catch(error => {
        console.error("Problem changing password:", error);
      });
  };

  return (
    <div>
      <h2>Account Info</h2>
    <Container>
      <Row>
        <Col md={8} lg={6} xl={5} >
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={userInfo.username} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleEmailChange}>Update Email</Button>
          </Form>

          <h3 className="mt-4">Change Password</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Old Password" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter New Password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
            </Form.Group>
            <Button variant="success" onClick={handleChangePassword}>Change Password</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default UserInfo;
