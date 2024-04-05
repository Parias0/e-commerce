import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import AdminService from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";

const ManagePlatforms = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentPlatform, setCurrentPlatform] = useState({ name: "" });
    const [editing, setEditing] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
const [showRelatedProductsModal, setShowRelatedProductsModal] = useState(false);

    const { currentUser } = useContext(AuthContext)
    const { platforms, fetchAllPlatforms } = useProductContext();
    const userToken = currentUser.token;

    useEffect(() => {
        fetchAllPlatforms();
    }, [fetchAllPlatforms]);


    const handleSavePlatform = async () => {
        const token = userToken;
        if (editing) {
            await AdminService.updatePlatform(currentPlatform.id, currentPlatform, token);
        } else {
            await AdminService.addPlatform(currentPlatform, token);
        }
        fetchAllPlatforms();
        handleCloseModal();
    };

    const handleDeletePlatform = async (id) => {
        const token = userToken;
        try {
            await AdminService.deletePlatform(id, token);
            fetchAllPlatforms();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setRelatedProducts(error.response.data.productNames);
                setShowRelatedProductsModal(true);
            } else {
                console.error("Error deleting platform: ", error);
            }
        }
    };
    

    const handleEditPlatform = (platform) => {
        setCurrentPlatform(platform);
        setEditing(true);
        setShowModal(true);
    };

    const handleShowModal = () => {
        setCurrentPlatform({ name: "" });
        setEditing(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setCurrentPlatform({ ...currentPlatform, [e.target.name]: e.target.value });
    };

    return (
        <Container className="bg-white p-3">
            <h2 className='m-2'>Platforms</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {platforms.map(platform => (
                        <tr key={platform.id}>
                            <td>{platform.name}</td>
                            <td>
                                <Button variant="secondary" onClick={() => handleEditPlatform(platform)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeletePlatform(platform.id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? "Edit Platform" : "Add New Platform"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Platform Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentPlatform.name}
                                onChange={handleInputChange}
                                placeholder="Provide Platform Name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSavePlatform}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRelatedProductsModal} onHide={() => setShowRelatedProductsModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Related products</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>This platform cannot be removed because it is linked to the following products:</p>
        <ul>
            {relatedProducts.map((product, index) => (
                <li key={index}>{product}</li>
            ))}
        </ul>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowRelatedProductsModal(false)}>
            Close
        </Button>
    </Modal.Footer>
</Modal>

            <Button variant="primary" onClick={handleShowModal}>Add New Platform</Button>
        </Container>
    );
};

export default ManagePlatforms;
