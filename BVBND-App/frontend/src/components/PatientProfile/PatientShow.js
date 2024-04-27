import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import BookingHistory from "../bookingHistory/BookingHistory";
import "./patientShow.css";
import PatientForm from "./PatientForm";
import { AuthContext } from "../../context/AuthContext";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from 'react-icons/bs';
const delay = 2500;

export default function PatientShow({ viewUser }) {
    const [appsCustomer, setAppsCustomer] = useState([]);
    const [currentApp, setCurrentApp] = useState();
    const [index, setIndex] = useState(0);
    const [shown, setShown] = useState(false);
    const timeoutRef = useRef(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchApps = async () => {
            const res = await axios(
                `/api/appointments/forCustomer/${viewUser._id}`
            );
            setAppsCustomer(res.data);
        };
        fetchApps();
    }, [viewUser]);

    const editBtn = (e) => {
        e.preventDefault();
        setCurrentApp(appsCustomer[index]);
        setShown(!shown);
    };

    // const resetTimeout = () => {
    //     if (timeoutRef.current) {
    //         clearTimeout(timeoutRef.current);
    //     }
    // };

    // useEffect(() => {
    //     resetTimeout();
    //     timeoutRef.current = setTimeout(
    //         () =>
    //             setIndex((prevIndex) =>
    //                 prevIndex === appsCustomer.length - 1 ? 0 : prevIndex + 1
    //             ),
    //         delay
    //     );

    //     return () => {
    //         resetTimeout();
    //     };
    // }, [index]);

    return (
        appsCustomer && (
            <>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col mx-3 p-5 patient-show--left-card bg-light">
                            <h1 className="text-center patientshow-left-card--title">Patient</h1>
                            <img
                                className="patient-show--left-card--profile-picture d-block mx-auto"
                                src={viewUser?.profilePicture}
                                alt=""
                            />
                            <div className="mb-3">
                                Name: {viewUser.username}
                            </div>
                            <div className="mb-3">
                                Email: {viewUser?.email}
                            </div>
                            <div className="mb-3">
                                Phone number:{" "}
                                {viewUser?.phoneNumber
                                    ? viewUser.phoneNumber
                                    : "None"}
                            </div>
                            <div className="mb-3">
                                Date of Birth:{" "}
                                {viewUser?.dateOfBirth
                                    ? viewUser.dateOfBirth
                                    : "None"}
                            </div>
                            <div className="mb-3">Blood: A</div>
                            {user.hasOwnProperty("numberOfBookings") && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={editBtn}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                        <div className="col mx-3 p-5 patient-show--right-card bg-light">
                            <h1 className="text-center patientshow-right-card--title">Appoinment History</h1>

                            <div className="slideshow">

                                {/* Profile picture, name, and timestamp */}
                                <div
                                    className="slideshowSlider"
                                    style={{
                                        transform: `translate3d(${
                                            -index * 100
                                        }%, 0, 0)`,
                                    }}
                                >
                                    {appsCustomer.length &&
                                        appsCustomer.map((b, index) => {
                                            return (
                                                <div
                                                    className="slide"
                                                    key={index}
                                                    onClick={editBtn}
                                                >
                                                    <BookingHistory
                                                        app={b}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>

                                {/* DOTS */}
                                <div className="slideshowDots">
                                    {appsCustomer.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`slideshowDot${
                                                index === idx
                                                    ? " active"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setIndex(idx);
                                            }}
                                        ></div>
                                    ))}
                                </div>

                                {/* BUTTONS */}
                                <div className="carousel--buttons">
                                    <div
                                        className="carousel--buttons--left"
                                        onClick={() => {
                                            if (index - 1 < 0)
                                                setIndex(
                                                    appsCustomer.length - 1
                                                );
                                            else setIndex(index - 1);
                                        }}
                                    >
                                        <BsCaretLeftSquareFill/>
                                    </div>
                                    <div
                                        className="carousel--buttons--right"
                                        onClick={() => {
                                            if (
                                                index + 1 >
                                                appsCustomer.length - 1
                                            )
                                                setIndex(0);
                                            else setIndex(index + 1);
                                        }}
                                    >
                                        <BsCaretRightSquareFill/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    {shown && <PatientForm app={currentApp} />}
                </div>
            </>
        )
    );
}
