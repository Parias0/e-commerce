import React from "react";
import { Tab, Tabs, Row, Col, Container } from "react-bootstrap";
import ManageProducts from "../components/admin/ManageProducts";
import Navbars from "../components/Navbars";
import ManageGenres from "../components/admin/ManageGenres";
import ManagePlatforms from "../components/admin/ManagePlatforms";

function AdminPanelPage() {

    return (
        <div className='d-flex flex-column min-vh-100 bg-dark'>
            <Navbars/>
            <Container className="p-3">
                <Row>
                    <Col sm={12}>
                        <Tabs defaultActiveKey="manageProducts" id="admin-tabs" >
                            <Tab eventKey="manageProducts" title="Manage Products">
                                <ManageProducts />
                            </Tab>
                            <Tab eventKey="manageGenres" title="Manage Genres">
                                <ManageGenres />
                            </Tab>
                            <Tab eventKey="managePlatforms" title="Manage Platforms">
                                <ManagePlatforms />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminPanelPage;
