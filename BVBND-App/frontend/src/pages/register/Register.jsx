import "./register.css";
import { useRef } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const phone = useRef();
    const idnumber = useRef();
    const navigate = useNavigate();

    const handleClickCustomer = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                phoneNumber: phone.current.value,
                idNumber: idnumber.current.value,
            };
            try {
                await axios.post("/api/customers/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleClickDoctor = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                phoneNumber: phone.current.value,
                idNumber: idnumber.current.value,
            };
            try {
                await axios.post("/api/doctors/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="login-left--title text-center">Sign Up</div>
                        <form className="mt-3">
                            <div className="form-group">
                                <label
                                    for="emailadress"
                                    className="col-sm-12 col-form-label"
                                >
                                    Email address
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">@</div>
                                    </div>
                                    <input
                                        id="examplemailadresseFormControlInput1"
                                        placeholder="name@example.com"
                                        type="email"
                                        className="form-control"
                                        ref={email}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    for="username"
                                    className="col-sm-12 col-form-label"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    placeholder="Username"
                                    type="text"
                                    className="form-control"
                                    ref={username}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    for="password"
                                    className="col-sm-12 col-form-label"
                                >
                                    Password
                                </label>
                                {/* <div className="col-sm-10"> */}
                                <input
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    ref={password}
                                    required
                                />
                                {/* </div> */}
                            </div>
                            <div className="form-group">
                                <label
                                    for="password"
                                    className="col-sm-12 col-form-label"
                                >
                                    Password (Repeat)
                                </label>
                                {/* <div className="col-sm-10"> */}
                                <input
                                    placeholder="Password (Repeat)"
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    ref={passwordAgain}
                                    required
                                />
                                {/* </div> */}
                            </div>
                            <div className="form-group">
                                <label
                                    for="phonenumber"
                                    className="col-sm-12 col-form-label"
                                >
                                    Phone Number
                                </label>
                                {/* <div className="col-sm-10"> */}
                                <input
                                    placeholder="Phone Number"
                                    type="tel"
                                    id="phonenumber"
                                    className="form-control"
                                    ref={phone}
                                    required
                                />
                                {/* </div> */}
                            </div>
                            <div className="form-group">
                                <label
                                    for="cccd"
                                    className="col-sm-12 col-form-label"
                                >
                                    Căn cước công dân
                                </label>
                                {/* <div className="col-sm-10"> */}
                                <input
                                    placeholder="Căn cước công dân"
                                    type="number"
                                    id="cccd"
                                    className="form-control"
                                    ref={idnumber}
                                    required
                                />
                                {/* </div> */}
                            </div>
                            <div className="d-flex align-items-center mt-5">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg col-5  d-flex align-items-center justify-content-center"
                                    onClick={handleClickCustomer}
                                >
                                    Sign Up as Patient&nbsp;<FiLogIn/>
                                </button>

                                <div className="col-2 text-center">OR</div>

                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-lg col-5  d-flex align-items-center justify-content-center"
                                    onClick={handleClickDoctor}
                                >
                                    Sign Up as Doctor&nbsp;<FiLogIn/>
                                </button>
                            </div>
                        </form>
                        <hr className="my-5"/>
                        <Link to={"/"}>
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-secondary btn-lg d-flex align-items-center justify-content-center col-6" >
                                <HiOutlineLogin/>&nbsp;Sign In
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <img src="assets/imgs/hospital.jpg" alt="" className="hero"/>
                        {/* <div className="background"></div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
