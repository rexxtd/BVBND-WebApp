import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

export default function BookingHistory({ app }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [doc, setDoc] = useState();

    useEffect(()=>{
        const fetchDoc = async() => {
            const res = await axios.get(`/api/doctors?doctorId=${app.doctorId}`);
            setDoc(res.data);
        }
        fetchDoc();
    },[app]);

    const dateToString = (date) => {
        return dayjs(date).format('DD/MM/YYYY HH:MM');
    }

    return (doc &&
        <>
            {/* <Link to={`/profile/${doc.username}`}> */}
                <div className="history-card-container">
                    <div className="history-card-container--left-card">
                        <img
                            src={
                                doc?.profilePicture
                            }
                            alt=""
                            className="history-card-container--left-card--profile-picture"
                        />
                    </div>
                    <div className="history-card-container--right-card">
                        <div className="name">{doc.username}</div>
                        <div className="info">
                            <div className="contact">{dateToString(app.bookingStartDate)}</div>
                            {/* <div className="online">
                                <div className="onlineIcon"></div>
                                <span className="onlineText">Online</span>  
                            </div> */}
                        </div>
                        {/* <div className="desc">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Architecto aperiam aut dolorum cumque ea
                            voluptatibus dolorem deserunt commodi impedit?
                            Consequatur!
                        </div> */}
                        {/* <div className="control">
                            <div className="rating">
                                <img
                                    src={PF + "system/rating.png"}
                                    alt=""
                                    className="ratingImg"
                                />
                                <span className="ratingNumber">
                                    {doc?.rating ? doc.rating : "None"}
                                </span>
                            </div>
                            <div className="booking">
                                <img
                                    src={PF + "system/contact.png"}
                                    alt=""
                                    className="ratingImg"
                                />
                                <span className="ratingNumber">
                                    {doc.numberOfBookings}
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            {/* </Link> */}
        </>
    );
}
