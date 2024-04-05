import React, { useState } from 'react';
import Navbars from '../components/Navbars';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';
import UserInfo from '../components/account/UserInfo';
import UserOrders from '../components/account/UserOrders';
import UserFavorites from '../components/account/UserFavorites.js';

const AccountPage = () => {
  const [key, setKey] = useState('userInfo');

  return(
    <div className='bg-dark min-vh-100'>
      <Navbars/>
      <Container className="mt-5 bg-light p-4 border rounded">
        <Tab.Container id="account-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="userInfo">Account Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userOrders">Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="userFavorites">Favorites</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className="px-0">
              <Tab.Content>
                <Tab.Pane eventKey="userInfo">
                  <UserInfo />
                </Tab.Pane>
                <Tab.Pane eventKey="userOrders">
                  <UserOrders />
                </Tab.Pane>
                <Tab.Pane eventKey="userFavorites">
                  <UserFavorites />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default AccountPage;
