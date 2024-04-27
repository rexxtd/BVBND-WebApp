import React, { createContext, useReducer } from 'react';
import { productReducer } from './productReducer';

export const ProductContext = createContext();

const ProductContextProvider = props => {
    const [products, dispatch] = useReducer(productReducer, []);

    return <ProductContext.Provider value={{ products, dispatch }}>{props.children}</ProductContext.Provider>;
};

export default ProductContextProvider;
