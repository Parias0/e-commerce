import React from 'react';
import Navbars from '../components/Navbars';
import CarouselHome from '../components/Carousel';
import ProductCard from '../components/products/ProductCard';


const Home = () => {

  return (
    <div className='bg-dark min-vh-100 d-flex flex-column'>
      <Navbars/>
      <CarouselHome/>
      <div className='my-5 flex-grow-1'>
        <ProductCard/>
      </div>
    </div>  
  );
};

export default Home;
