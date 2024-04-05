import React, { createContext, useState, useContext } from 'react';
import ProductService from '../services/ProductService';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    const fetchAllGenres = async () => {
        const response = await ProductService.getAllGenres();
        setGenres(response.data);
    };

    const fetchAllPlatforms = async () => {
        const response = await ProductService.getAllPlatforms();
        setPlatforms(response.data);
    };

    const fetchAllProducts = async (page, size) => {
        const response = await ProductService.getAllProducts(page, size);
        setProducts(response.data.content || []);
    };


    return (
        <ProductContext.Provider value={{ products, genres, platforms, fetchAllGenres, fetchAllPlatforms, fetchAllProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
