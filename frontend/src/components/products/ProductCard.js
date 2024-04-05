import React, { useState, useEffect } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import ProductService from "../../services/ProductService";


function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = 0;
        const size = 12;
        const response = await ProductService.getAllProducts(page, size);
        setProducts(response.data.content); // Ustawianie produktów
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
        {products.map((product, idx) => (
          <Col key={idx}>
            <Card className="bg-dark text-white productcard-hover-effect">
              <Card.Link
                href={`/product-detail/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="productcard-img-hover"
                  style={{
                    objectFit: "cover",
                    height: "400px",
                    objectPosition: "top",
                  }}
                />
                <div className="productcard-info">
                  <strong>{product.name}</strong> - {product.price} USD
                </div>
              </Card.Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}



export default ProductCard;
