import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import AdminService from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";

const ManageGenres = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentGenre, setCurrentGenre] = useState({ name: "" });
    const [editing, setEditing] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
const [showRelatedProductsModal, setShowRelatedProductsModal] = useState(false);

    const { currentUser } = useContext(AuthContext)
    const { genres, fetchAllGenres } = useProductContext();
    const userToken = currentUser.token;

    useEffect(() => {
        fetchAllGenres();
    }, [fetchAllGenres]);


    const handleSaveGenre = async () => {
        console.log("Zapisywanie gatunku:", currentGenre);
        const token = userToken;
        if (editing) {
            await AdminService.updateGenre(currentGenre.id, currentGenre, token);
        } else {
            await AdminService.addGenre(currentGenre, token);
        }
        fetchAllGenres();
        handleCloseModal();
    };

    const handleDeleteGenre = async (id) => {
        const token = userToken;
        try {
            await AdminService.deleteGenre(id, token);
            fetchAllGenres();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setRelatedProducts(error.response.data.productNames); 
                setShowRelatedProductsModal(true);
            } else {
                console.error("Wystąpił błąd podczas usuwania gatunku", error);
            }
        }
    };
    
    
    

    const handleEditGenre = (genre) => {
        setCurrentGenre(genre);
        setEditing(true);
        setShowModal(true);
    };

    const handleShowModal = () => {
        setCurrentGenre({ name: "" });
        setEditing(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setCurrentGenre({ ...currentGenre, [e.target.name]: e.target.value });
    };

    return (
        <Container className="bg-white p-3">
            <h2 className='m-2'>Genres</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map(genre => (
                        <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td>
                                <Button variant="secondary" onClick={() => handleEditGenre(genre)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteGenre(genre.id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? "Edit Genre" : "Add New Genre"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentGenre.name}
                                onChange={handleInputChange}
                                placeholder="Provide Genre Name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveGenre}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRelatedProductsModal} onHide={() => setShowRelatedProductsModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Related products</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>This genre cannot be removed because it is linked to the following products:</p>
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

            <Button variant="primary" onClick={handleShowModal}>Add New Genre</Button>
        </Container>
    );
};

export default ManageGenres;
