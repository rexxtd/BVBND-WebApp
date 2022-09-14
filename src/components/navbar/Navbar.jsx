import "./navbar.css";


export default function Navbar() {
    return (
        <div className="navbarWrapper">
            <div className="navLeft">
                <div className="logoText">HOTDOC</div>
                <div className="logoShape"></div>
            </div>
            <div className="navCenter">
                <a href="http://localhost:3001/" className="page">Return to Homepage</a>
                <a href="http://localhost:3000/chats" className="page">Messenger</a>
            </div>
            <div className="navRight">
                <button className="navBtn">
                    <span className="btnText">Sign in</span>
                </button>
            </div>
        </div>
    );
}
