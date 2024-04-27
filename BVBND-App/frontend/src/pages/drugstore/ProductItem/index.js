import React from "react";
import { useContext } from "react";
// import { Button, Card, Col } from "react-bootstrap";
import { ProductContext } from "../productContext";
import "../Drugstore.css";
import { BsCartPlus } from "react-icons/bs";

function addDotAfterThreeDigit(number) {
    let num = number.toString();
    let result = "";
    while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

const ProductItem = (props) => {
    const { dispatch } = useContext(ProductContext);
    const item = props.drugItem;
    return (
        <>
            {/* <Col>
                <Card
                    className="productItem "
                    style={{ width: 350, height: 350 }}
                >
                    <Card.Body>
                        <div className="drugImage"></div>
                        <Card.Title className="cardTitle">
                            {item.drugName}
                        </Card.Title>
                        <Card.Text>{item.price}</Card.Text>
                        <div className="drugCardbtn">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const chosenItem = {
                                        id: item._id,
                                        name: item.drugName,
                                        price: item.price,
                                    };
                                    const actionCart = {
                                        actionType: "ADD_PRODUCT_TO_CART",
                                        chosenItem,
                                    };
                                    dispatch(actionCart);
                                }}
                            >
                                Buy Item
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col> */}


            <div className="card bg-light m-3 store--container">
                {/* Maybe add .card-img-top to img tag? */}
                <img
                    className="store--image"
                    src="/assets/imgs/drug.jpg"
                    alt="Card image cap"
                />
                <div className="card-body">
                    <h5 className="card-title">{item.drugName}</h5>
                    <div className="store--description--container">
                        <p className="card-text text-secondary store--description--container--text">Description: {item.discrib}</p>
                    </div>
                    <p className="card-text text-success">{addDotAfterThreeDigit(item.price)} VND/Item</p>
                    <div
                        className="btn btn-success store--add-to-cart d-flex align-items-center"
                        onClick={(e) => {
                            e.preventDefault();
                            const chosenItem = {
                                id: item._id,
                                name: item.drugName,
                                price: item.price,
                            };
                            const actionCart = {
                                actionType: "ADD_PRODUCT_TO_CART",
                                chosenItem,
                            };
                            dispatch(actionCart);
                        }}
                    >
                        Add to Cart
                        <BsCartPlus/>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductItem;
