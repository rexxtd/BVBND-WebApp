import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// import { Button, Container, Form, Table } from "react-bootstrap";
import Navbar from "../../components/navbar/Navbar";
import { ProductContext } from "../drugstore/productContext";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

const Checkout = () => {
    const { products } = useContext(ProductContext);
    console.log(products);

    const [customerPhoneNumber, setPhoneNumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [orders, setOrders] = useState([]);
    const formatData = (data) => {
        let drugsDistinct = [];
        for (const drugItem of data) {
            if (!drugsDistinct.includes(drugItem.id)) {
                drugsDistinct.push(drugItem.id);
            }
        }

        let results = [];
        for (const drugId of drugsDistinct) {
            const drugQty = data.reduce((total, drugItem) => {
                if (drugItem.id === drugId) {
                    return (total = total + 1);
                }
                return total;
            }, 0);
            const drugItem = data.find((drug) => drug.id === drugId);

            results.push({
                drugId: drugItem.id,
                drugName: drugItem.name,
                drugQuantity: drugQty,
                drugPrice: drugItem.price,
            });
        }
        return results;
    };

    useEffect(() => {
        if (products) {
            const productFormated = formatData(products);
            setOrders(productFormated);
        }
    }, [products]);

    const renderOrders = orders.map((order, index) => (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.drugName}</td>
            <td>{addDotAfterThreeDigit(order.drugPrice)} VND</td>
            <td>{order.drugQuantity}</td>
        </tr>
    ));

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

    function handleOnCheckOut() {
        const totalPrice = orders.reduce((total, order) => {
            const { drugPrice, drugQuantity } = order;
            const orderPrice = Number(drugPrice) * Number(drugQuantity);
            return total + orderPrice;
        }, 0);

        const orderProductIds = orders.map((order) => order.drugId);

        const body = {
            orderStatus: "Pending",
            orderPhoneNumber: customerPhoneNumber,
            orderAddress: customerAddress,
            orderTotalPrice: totalPrice,
            productId: orderProductIds,
        };

        axios.post("/api/drugOrder", body);

        window.alert("SUCCESS: Your order has been placed!");
        window.location.href = "/drugstore";
    }

    return (
        <>
            <Navbar />

            {/* <Container>
                <h1>Cart Checkout</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Drug Name</th>
                            <th>Price/Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrders}
                    </tbody>
                </Table>
                <Form>
                    <Form.Group
                        className='mb-3'
                        onChange={e => {
                            setCustomerAddress(e.target.value);
                        }}
                    >
                        <Form.Label>Customer address</Form.Label>
                        <Form.Control placeholder='Enter Address' />
                    </Form.Group>
                    <Form.Group
                        className='mb-3'
                        onChange={e => {
                            setPhoneNumber(e.target.value);
                        }}
                    >
                        <Form.Label>Customer Phone Number</Form.Label>
                        <Form.Control placeholder='Enter Your Phone Number' />
                    </Form.Group>
                </Form>
                <Button
                    onClick={() => handleOnCheckOut}
                >
                    Create Order
                </Button>
            </Container> */}

            <hr />

            <div className="container my-5">
                {/* 1 */}
                <div className="row">
                    <h1 className="h1 text-center">Cart Checkout</h1>
                </div>

                {/* 2 */}
                <table class="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Medicine Name</th>
                            <th scope="col">Price/Item</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>{renderOrders}</tbody>
                </table>

                {/* 3 */}
                <div className="row mt-5">
                    <h1 className="h1 text-center">
                        Patient Shipping Information
                    </h1>
                </div>

                {/* 4 */}
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Home Address</label>
                            <input
                                type="text"
                                class="form-control"
                                id="inputEmail4"
                                placeholder="702 Nguyen Van Linh, District 7, Ho Chi Minh City"
                                value={customerAddress}
                                onChange={(e) => {
                                    setCustomerAddress(e.target.value);
                                }}
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Phone Number</label>
                            <input
                                type="tel"
                                class="form-control"
                                id="inputPassword4"
                                placeholder="+84 123 456 789"
                                value={customerPhoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </form>

                {/* 5 */}
                <div className="row justify-content-center mt-5">
                    <div className="col-3">
                        <div
                            className="btn btn-lg btn-secondary d-flex justify-content-center align-items-center store--see-cart-button"
                            onClick={() => {window.location.href = "/drugstore"}}
                        >
                            <IoIosArrowBack />
                            <span>&nbsp;Back to Store</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div
                            className="btn btn-lg btn-success d-flex justify-content-center align-items-center store--see-cart-button"
                            onClick={handleOnCheckOut}
                        >
                            <BsFillCreditCard2BackFill />
                            <span>&nbsp;Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
