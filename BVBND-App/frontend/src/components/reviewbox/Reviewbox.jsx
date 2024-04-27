import "./reviewbox.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Reviewbox({viewUser}) {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newReview = {
            customerName: user.username,
            doctorId: viewUser._id,
            desc: desc.current.value,
        };
        try {
            await axios.post("/api/reviews/give", newReview);
            window.location.reload();
        } catch (err) {}
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <input
                        placeholder={
                            "What's in your mind " + user.username + "?"
                        }
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                {/* <hr className="shareHr" /> */}
                <form className="shareBottom" onSubmit={submitHandler}>
                    {/* Old class name: review-box--button */}
                    <button className="btn btn-success" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
