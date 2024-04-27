import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import ProductContextProvider from "./pages/drugstore/productContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider>
        <AuthContextProvider>
            <ProductContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ProductContextProvider>
        </AuthContextProvider>
    </ChakraProvider>
);