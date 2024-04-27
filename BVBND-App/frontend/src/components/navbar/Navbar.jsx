import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {FiExternalLink} from "react-icons/fi";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = async () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        // <div className="navbarWrapper sticky-top" id="navbar">
        //     <Link to={"/"}>
        //         <div className="navLeft">
        //             <div className="navbar-bvbnd-logo-container">
        //                 <img src="https://www.bvbnd.vn/wp-content/uploads/2020/08/LogoBVBND.png" alt="bvbnd-logo" />
        //             </div>
        //             <div className="logoText">BỆNH VIỆN BỆNH NHIỆT ĐỚI</div>
        //         </div>
        //     </Link>
        //     <div className="navCenter">
        //         <Link to={"/"}><div className="page">News Feed</div></Link>
        //         <Link to={"/viewdoctors"}><div className="page">Find a Doctor</div></Link>
        //         <a href="https://bvbnd-messenger.herokuapp.com/" className="page d-flex align-items-center" target="_blank">Consult Online <FiExternalLink/></a>
        //         <Link to={"/drugstore"}><div className="page">Store</div></Link>
        //     </div>
        //     <div className="navRight">
        //         {user && (
        //             <Link to={`/profile/${user.username}`}>
        //                 <img
        //                     src={
        //                         user?.profilePicture
        //                             // ? PF + user.profilePicture
        //                             // : PF + "person/noAvatar.png"
        //                     }
        //                     alt=""
        //                     className="navAvatar"
        //                 />
        //             </Link>
        //         )}
        //         {!user ? (
        //             <button className="navBtn">
        //                 <span className="btnText">Sign In</span>
        //             </button>
        //         ) : (
        //             <button className="navBtn" onClick={handleLogout}>
        //                 <span className="btnText">Sign Out</span>
        //             </button>
        //         )}
        //     </div>
        // </div>

        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top px-5 navbar-custom" id="navbar" >
                
                {/* 1 */}
                <Link to={"/"}>
                    <div class="navbar-brand d-flex align-items-center navbar--left--container" >
                        <div className="navbar--left--logo">
                            <img src="/assets/imgs/Logo.png" alt="bvbnd-logo" />
                        </div>
                        <div className="navbar--left--text">BỆNH VIỆN BỆNH NHIỆT ĐỚI</div>
                    </div>
                </Link>
                
                {/* 2 */}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                    </span>
                </button>

                {/* 3 */}
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <Link to={"/"}>
                            <li class="nav-item">
                                <div class="navbar--center--text mx-3 text-secondary">News Feed</div>
                            </li>
                        </Link>
                        <Link to={"/viewdoctors"}>
                            <li class="nav-item">
                                <div class="navbar--center--text mx-3 text-secondary">Find a Doctor</div>
                            </li>
                        </Link>
                        <li class="nav-item">
                            <a class="d-flex align-items-center navbar--center--text mx-3 text-secondary" href="https://bvbnd-messenger.herokuapp.com" target="_blank">Consult Online&nbsp;<FiExternalLink size={12}/></a>
                        </li>
                        <Link to={"/drugstore"}>
                            <li class="nav-item">
                                <div class="navbar--center--text mx-3 text-secondary">Store</div>
                            </li>
                        </Link>
                    </ul>
                </div>

                {/* 4 */}
                <div className="mr-sm-2 d-flex align-items-center">
                    {user && (
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    user?.profilePicture
                                        // ? PF + user.profilePicture
                                        // : PF + "person/noAvatar.png"
                                }
                                alt=""
                                className="navbar--right--profile-picture mx-2"
                            />
                            <div className="btn btn-secondary mx-3">Personal Profile</div>
                        </Link>
                    )}
                    {!user ? (
                        <div className="btn btn-secondary">Sign In</div>
                    ) : (
                        <div className="btn btn-secondary" onClick={handleLogout}>Sign Out</div>
                    )}
                </div>
            </nav>
        </>
    );
}
