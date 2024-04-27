import "./profile.css";
import Navbar from "../../components/navbar/Navbar";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import Reviewbox from "../../components/reviewbox/Reviewbox";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PatientShow from "../../components/PatientProfile/PatientShow";
import Footer from "../../components/footer/Footer";
import { BsCalendarCheck } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    const { user } = useContext(AuthContext);
    const [viewUser, setUser] = useState();
    const [allCus, setCus] = useState([]);

    useEffect(()=>{
        const fetchUsers = async () =>{
            const res = await axios.get("/customers/all");
            setCus(res.data);
        }
        fetchUsers();
    }, [username]);

    // useEffect(()=>{
    //     const isDoctor = (n) => {
    //         for(const u of allCus){
    //             if(n===u.username) setIsDoc(false);
    //         }
    //         console.log(isDoc);
    //     }
    //     isDoctor(username);
    // },[]);

    useEffect(() => {
            const fetchDoc = async () => {
                const res = await axios.get(`/doctors?doctorname=${username}`);
                setUser(res.data);
            };
            const fetchCus = async () => {
                const res = await axios.get(`/customers?customername=${username}`);
                setUser(res.data);
            };

            const fetchTypeUser = async (n) =>{
                for(const u of allCus){
                    if(n===u.username) {
                        fetchCus();
                        return;
                    }
                }
                fetchDoc();
            }
            fetchTypeUser(username);
        }, [allCus]);

    const ProfileDoctor = () => {
        const [shown, setShown] = useState(false);
        const handleAddReview = async (e) => {
            e.preventDefault();
            setShown(!shown);
        };

        const handleBookBtn = async (e) => {
            e.preventDefault();
        };

        // useEffect(() => {
        //     const fetchUser = async () => {
        //         const res = await axios.get(`/doctors?doctorname=${username}`);
        //         setUser(res.data);
        //     };
        //     fetchUser();
        // }, [username]);

        return (
            <>
                <Navbar />
                <div className="profile">
                    <div className="profileTop">
                        <div className="top-left">
                            <img
                                src={
                                    user?.profilePicture
                                        // ? PF + viewUser.profilePicture
                                        // : PF + "person/noAvatar.png"
                                }
                                alt=""
                                className="top-left--profile-picture"
                            />
                            <div className="top-left--profile-name">
                                {viewUser.username}
                            </div>
                            <Link to={`/calendar/${username}`} >
                                <div className="btn btn-success btn-lg d-flex align-items-center justify-content-center m-5 top-left--book-button">
                                    Book an Appointment&nbsp;<BsCalendarCheck/>
                                </div>
                            </Link>
                        </div>
                        <div className="top-right">
                            {/* <div className="infoTop">
                                <div className="infoCard dept">
                                    <span className="cardTitle">
                                        Current Department
                                    </span>
                                    <p className="infoDepartment">
                                        {viewUser?.currentDepartment ? 
                                        viewUser.currentDepartment
                                        :"NaN"}
                                    </p>
                                </div>
                                <div className="infoCard spec">
                                    <span className="cardTitle">
                                        Specialization
                                    </span>
                                    <p className="infoDepartment">
                                        {viewUser?.services ? 
                                        viewUser.services
                                        :"NaN"}
                                    </p>
                                </div>
                                <div className="infoCard exp">
                                    <span className="cardTitle">
                                        Work expererience
                                    </span>
                                    <p className="infoDepartment">
                                        {viewUser?.workingDesc ? 
                                        viewUser.workingDesc
                                        :"NaN"}
                                    </p>
                                </div>
                            </div> */}
                            {/* <div className="infoBottom">
                            </div> */}
                        </div>
                    </div>
                    <div className="profileBottom">
                        <div className="bottom-left">
                            <div className="bottom-left--container">
                                <div className="bottom-left--container--title">
                                    Information
                                </div>
                                {/* <div className="bottom-left--container--detail">
                                    Birthday:{" "}
                                    {viewUser?.dateOfBirth
                                        ? viewUser.dateOfBirth
                                        : "NaN"}
                                </div> */}
                                <div className="bottom-left--container--detail">
                                    Email:{" "}
                                    {viewUser?.email ? viewUser.email : "NaN"}
                                </div>
                                <div className="bottom-left--container--detail">
                                    Phone:{" "}
                                    {viewUser?.phoneNumber
                                        ? viewUser.phoneNumber
                                        : "NaN"}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-right">
                            <div className="bottom-right--container">
                                <span className="bottom-right--container--title">
                                    Patient Reviews
                                </span>
                                <div className="btn btn-secondary btn-lg d-flex align-items-center" onClick={handleAddReview}>
                                    Add Review&nbsp;<HiOutlineStar/>
                                </div>
                                {shown && <Reviewbox viewUser={viewUser} />}
                                <div className="bottom-right--container--button--carousel">
                                    <ReviewCard user={viewUser} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const ProfilePatient = () => {
        return(
            <>
                <Navbar />
                <PatientShow viewUser={viewUser}/>
            </>
        )
    }

    return (
        <>  
            {(viewUser && viewUser.hasOwnProperty('numberOfBookings')) && (<ProfileDoctor />)}
            {(viewUser && !viewUser.hasOwnProperty('numberOfBookings')) && (<ProfilePatient />)}
            <Footer />
        </>
    );
}