import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbarWrapper sticky-top" id="navbar">
            <Link to={"/"}>
                <div className="navLeft">
                    <div className="navbar-bvbnd-logo-container">
                        <img src="https://www.bvbnd.vn/wp-content/uploads/2020/08/LogoBVBND.png" alt="bvbnd-logo" />
                    </div>
                    <div className="logoText">BỆNH VIỆN BỆNH NHIỆT ĐỚI</div>
                </div>
            </Link>
            <div className="navCenter">
                <a href="https://bvbnd.herokuapp.com/" className="page">Return to Homepage</a>
                <a href="https://bvbnd-messenger.herokuapp.com/" className="page">Consult Online</a>
            </div>
            <div className="navRight">
                <button className="navBtn">
                    <span className="btnText">Sign in</span>
                </button>
            </div>
        </div>
    );
}
