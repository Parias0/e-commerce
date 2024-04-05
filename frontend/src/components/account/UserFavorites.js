import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import FavoriteService from '../../services/FavoriteService';
import { AuthContext } from '../../context/AuthContext';

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const fetchFavorites = useCallback(() => {
    FavoriteService.getFavorites(currentUser.token)
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error("Error fetching favorites:", error);
      });
  }, [currentUser.token]);
  
  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser, fetchFavorites]);

  const handleRemoveFavorite = (productId) => {
    FavoriteService.toggleFavorite(productId, currentUser.token)
      .then(() => {
        fetchFavorites();
      })
      .catch(error => {
        console.error("Error removing favorite:", error);
      });
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <p>Nie masz jeszcze ulubionych produktów.</p>
      ) : (
        favorites.map(favorite => (
          <Card key={favorite.favoriteId} className="mb-3" style={{ maxWidth: '900px', maxHeight: "250px" }}>
            <Card.Body>
              <Row>
                <Col md={2}>
                  <Card.Img  
                    src={favorite.productImage}
                    className="img-fluid rounded-start" 
                    style={{ width: "100%",
                    height: "100%", objectFit: 'cover' }} 
                  />
                </Col>
                <Col>
                  <Card.Title>{favorite.productName}</Card.Title>
                  <Card.Text>
                    Price: {favorite.productPrice} PLN
                  </Card.Text>
                  <Button 
                    variant="danger" 
                    onClick={() => handleRemoveFavorite(favorite.productId)}>
                    Remove from favorites
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserFavorites;
