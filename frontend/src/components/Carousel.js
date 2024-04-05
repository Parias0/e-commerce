import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselHome() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/image1.png"
          alt="First slide"
          style={{ maxHeight: '500px', backgroundSize: 'cover', backgroundPosition: 'center top' }}
        />
        <Carousel.Caption>
          <h3>The Witcher 3: Wild Hunt</h3>      
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/image2.jpg"
          alt="Second slide"
          
          style={{ maxHeight: '500px', backgroundSize: 'cover', backgroundPosition: 'center top'}}
          
        />
        <Carousel.Caption>
          <h3>Call of Duty: Modern Warfare</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/image3.jpg"
          alt="Third slide"
          style={{ maxHeight: '500px', backgroundSize: 'cover', backgroundPosition: 'center top' }}
        />
        <Carousel.Caption>
          <h3>Cyberpunk 2077</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;
