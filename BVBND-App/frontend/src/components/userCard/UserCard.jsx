import "./userCard.css";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <Link to={`/profile/${user.username}`}>
                <div className="userCard">
                    <div className="card-left">
                        <img
                            src={
                                user?.profilePicture
                                    ? user.profilePicture
                                    : PF + "/person/noAvatar.png"
                            }
                            alt=""
                            className="card-left--profile-picture"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-right--name">{user.username}</div>
                        <div className="card-right--info">
                            <div className="card-right--info--email">{user.email}</div>
                            {/* <div className="online">
                                <div className="onlineIcon"></div>
                                <span className="onlineText">Online</span>
                            </div> */}
                        </div>
                        <div className="card-right--description">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Architecto aperiam aut dolorum cumque ea
                            voluptatibus dolorem deserunt commodi impedit?
                            Consequatur!
                        </div>
                        {/* <div className="control">
                            <div className="rating">
                                <img
                                    src={PF + "system/rating.png"}
                                    alt=""
                                    className="ratingImg"
                                />
                                <span className="ratingNumber">
                                    {user?.rating ? user.rating : "None"}
                                </span>
                            </div>
                            <div className="booking">
                                <img
                                    src={PF + "system/contact.png"}
                                    alt=""
                                    className="ratingImg"
                                />
                                <span className="ratingNumber">
                                    {user.numberOfBookings}
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Link>
        </>
    );
}
