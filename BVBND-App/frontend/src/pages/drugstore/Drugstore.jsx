import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Drugstore.css";
import ProductItem from "./ProductItem";
import QuantityButton from "./QuantityButton";
import axios from "axios";

const Drugstore = () => {
    const [drugs, setDrugs] = useState([]);

    const generateItem = () => {
        return drugs.map((item) => <ProductItem drugItem={item} />);
    };

    useEffect(() => {
        const fetchDrugs = async () => {
            const drugProtoData = await axios.get("/api/drugStore");
            setDrugs(drugProtoData.data);
        };
        fetchDrugs();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-3">
                        <QuantityButton></QuantityButton>
                    </div>
                </div>
                <div className="row justify-content-center">{generateItem()}</div>
            </div>
        </>
    );
};

export default Drugstore;
