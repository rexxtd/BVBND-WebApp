import "./viewdoctors.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import UserCard from "../../components/userCard/UserCard";
import Ranking from "../../components/ranking/Ranking";
import Share from "../../components/share/Share";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Viewdoctors() {
    const { user } = useContext(AuthContext);
    const [allDoctors, setAllDoctors] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("/api/doctors/all/");
            setAllDoctors(res.data);
        };
        fetchUser();
    }, [user._id]);

    return (
        <>
            <Navbar />
            <div className="viewWrapper">
                
                <div className="viewTop">
                    <button className="view-doctors--sort-button">
                        <span className="view-doctors--sort-button--text">Ophthalmologists</span>
                    </button>
                    <button className="view-doctors--sort-button">
                        <span className="view-doctors--sort-button--text">Cardiologists</span>
                    </button>
                    <button className="view-doctors--sort-button">
                        <span className="view-doctors--sort-button--text">Allergists</span>
                    </button>
                    <button className="view-doctors--sort-button">
                        <span className="view-doctors--sort-button--text">Dermatologists</span>
                    </button>
                    <button className="view-doctors--sort-button">
                        <span className="view-doctors--sort-button--text">More...</span>
                    </button>
                </div>


                <div className="viewMiddle">
                    {/* <Share /> */}
                </div>
                
                <div className="viewBottom">
                    <div className="viewLeft">
                        {allDoctors.length
                            ? allDoctors.map((doc) => (
                                  <UserCard user={doc} key={doc._id} />
                              ))
                            : "No Doctors"}
                    </div>
                    <div className="viewRight">
                        <div className="adBanner">
                            <img
                                src="/assets/imgs/hospital.jpg"
                                alt=""
                                className="adImg"
                            />
                        </div>
                        <div className="view-doctors--doctor-ranking-container">
                            <div className="view-doctors--doctor-ranking-text">Best Doctors</div>
                            <Ranking allDoctors={allDoctors} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
