import "./viewdoctors.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import UserCard from "../../components/userCard/UserCard";
import Ranking from "../../components/ranking/Ranking";
import Share from "../../components/share/Share";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Viewusers() {
    const { user } = useContext(AuthContext);
    const [allCus, setAllCus] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [allApps, setAllApps] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchApps = async () => {
            const res = await axios.get(`/api/appointments/${user._id}`);
            setAllApps(res.data);
        };
        fetchApps();
    }, [user._id]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("/api/customers/all/");
            const arr = [];
            for(const app of allApps){
                for(const cus of res.data){
                    if(app.customerId===cus._id && !arr.includes(cus)) arr.push(cus);
                }
            }
            setAllCus(arr);
        
        };
        fetchUser();
    }, [allApps]);

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
                        {allCus.length
                            ? allCus.map((cus) => (
                                  <UserCard user={cus} key={cus._id} />
                              ))
                            : "No Customers"}
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
