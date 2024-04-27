import Navbar from "../../components/navbar/Navbar";
import { useContext, useRef } from "react";
import { loginCallCustomer, loginCallDoctor } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClickCustomer = (e) => {
        e.preventDefault();
        loginCallCustomer(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };
    const handleClickDoctor = (e) => {
        e.preventDefault();
        loginCallDoctor(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };
    return (
        <>
            {/* <Navbar /> */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="login-left--title text-center">Sign In</div>
                        <form className="mt-3">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    Email address
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">@</div>
                                    </div>
                                    <input
                                        id="exampleFormControlInput1"
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
                                    for="inputPassword"
                                    className="col-sm-2 col-form-label"
                                >
                                    Password
                                </label>
                                {/* <div className="col-sm-10"> */}
                                <input
                                    placeholder="Password"
                                    type="password"
                                    id="inputPassword"
                                    className="form-control"
                                    ref={password}
                                    required
                                />
                                {/* </div> */}
                            </div>

                            <div className="d-flex align-items-center mt-5">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg col-5 d-flex align-items-center justify-content-center"
                                    onClick={handleClickCustomer}
                                >
                                    Sign In as Patient&nbsp;<FiLogIn/>
                                </button>
                                
                                <div className="col-2 text-center">OR</div>
                                
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-lg col-5 d-flex align-items-center justify-content-center"
                                    onClick={handleClickDoctor}
                                >
                                    Sign In as Doctor&nbsp;<FiLogIn/>
                                </button>
                            </div>
                        </form>
                        <hr className="my-5"/>
                        <Link to={"/register"}>
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-secondary btn-lg d-flex align-items-center justify-content-center col-6" >
                                    Sign Up&nbsp;<FiLogIn/>
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
