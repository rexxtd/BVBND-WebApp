import React, { useContext } from "react";
import { ProductContext } from "../productContext";
import "../Drugstore.css";
import {BsCartPlus} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const QuantityButton = () => {
    const { products } = useContext(ProductContext);
    const navigate = useNavigate();
    const productsQuantity = products.length;

    return (
        <>
            <div className="btn btn-lg btn-success d-flex justify-content-center align-items-center store--see-cart-button" onClick={() => navigate("/checkout")}>
                <BsCartPlus/>
                <span>&nbsp;Cart: {productsQuantity} Items</span>
            </div>
        </>
    );
};
export default QuantityButton;
