import "./reviewCard.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const delay = 2500;

export default function ReviewCard({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [index, setIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            let res = [];
            for (const id of user.reviews) {
                const obj = await axios.get(`/api/reviews/get?reviewId=${id}`);
                const cus = await axios.get(
                    `/api/customers?customername=${obj.data.customerName}`
                );
                res = [...res, [cus.data, obj.data]];
            }
            setReviews(res);
        };
        fetchReviews();
    }, [user.reviews]);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {reviews.length &&
                    reviews.map((r, index) => {
                        return (
                            <div className="slide" key={index}>
                                <div className="slideLeft">
                                    <img
                                        src={
                                            user?.profilePicture
                                            // ? PF + r[0].profilePicture
                                            // : PF + "person/noAvatar.png"
                                        }
                                        alt=""
                                        className="reviewAvatar"
                                    />
                                    <div className="reviewUserName">
                                        {r[0].username}
                                    </div>
                                </div>
                                <div className="slideRight">
                                    <p className="reviewPara">{r[1].desc}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className="slideshowDots">
                {reviews.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${
                            index === idx ? " active" : ""
                        }`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
