import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Row, ListGroupItem } from "react-bootstrap";
import PlatformIcons from "./PlatformIcons";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FavoriteService from '../../services/FavoriteService'; 
import { AuthContext } from "../../context/AuthContext";

function FilteredProducts({ products }) {
  const [favorites, setFavorites] = useState(new Set());
  const { currentUser } = useContext(AuthContext);
  

  useEffect(() => {
    if (currentUser) {
      FavoriteService.getFavorites(currentUser.token)
        .then(response => {
          // Użyj productId zamiast fav.product.id
          const favoriteProductIds = new Set(response.data.map(fav => fav.productId));
          setFavorites(favoriteProductIds);
        })
        .catch(error => {
          console.error("Error fetching favorites:", error);
        });
    }
  }, [currentUser]);
  
  

  const toggleFavorite = (productId, event) => {
    event.stopPropagation(); // Zapobiega propagacji zdarzenia
    if (!currentUser) return;
  
    FavoriteService.toggleFavorite(productId, currentUser.token)
      .then(() => {
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
          } else {
            newFavorites.add(productId);
          }
          return newFavorites;
        });
      })
      .catch(error => {
        console.error("Error toggling favorite:", error);
      });
  };

  const handleCardClick = (productId) => {
    // Przekierowanie do szczegółów produktu
    window.location.href = `/product-detail/${productId}`;
  };

  return (
    <div>
      {products.map((product) => (
        <Card key={product.id} className="mb-3 card-hover-effect" style={{ maxWidth: '1200px', maxHeight: "300px" }} onClick={() => handleCardClick(product.id)}>
          <Row className="g-0">
            <Col md={2}>
              <Card.Img 
                src={product.image} 
                className="img-fluid rounded-start" 
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%"
                }}
              />
            </Col>
            <Col md={10}>
              <Card.Body>
                <Card.Title>
                  {product.name}
                  <span onClick={(event) => toggleFavorite(product.id, event)} style={{ cursor: "pointer", float: "right" }}>
                    {favorites.has(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                  </span>
                </Card.Title>
                <Card.Text>
                  <PlatformIcons platforms={product.platforms} />
                </Card.Text>
                <ListGroupItem>{product.genre.name}</ListGroupItem>
                <div className="ms-auto p-2" style={{ textAlign: "right" }}>
                  <strong>{product.price} USD</strong>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
  
}

export default FilteredProducts;
