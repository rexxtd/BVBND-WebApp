import "./post.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
// import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [allCus, setCus] = useState([]);
    
    
    useEffect(()=>{
        const fetchUsers = async () =>{
            const res = await axios.get("/api/customers/all");
            setCus(res.data);
        }
        fetchUsers();
    }, [currentUser._id]);
    
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users?userId=${post.userId}`);
    //         setUser(res.data);
    //     };
    //     fetchUser();
    // }, [post.userId]);
    useEffect(() => {
        const fetchDoc = async () => {
            const res = await axios.get(`/api/doctors?doctorId=${post.userId}`);
            setUser(res.data);
        };
        const fetchCus = async () => {
            const res = await axios.get(`/api/customers?customerId=${post.userId}`);
            setUser(res.data);
        };

        const fetchTypeUser = async (n) =>{
            for(const u of allCus){
                if(n===u._id) {
                    fetchCus();
                    return;
                }
            }
            fetchDoc();
        }
        fetchTypeUser(post.userId);
    }, [allCus]);

    const likeHandler = () => {
        try {
            axios.put("/api/posts/" + post._id + "/like", {
                userId: currentUser._id,
            });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (user &&
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img
                                src={
                                    user?.profilePicture
                                        // ? PF + user.profilePicture
                                        // : PF + "person/noAvatar.png"
                                }
                                alt=""
                                className="postProfileImg"
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">
                            {format(post.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        {/* <MoreVert /> */}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            src="/assets/imgs/heart.png"
                            alt=""
                            className="likeIcon"
                            onClick={likeHandler}
                        />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        {/* <span className="postCommentText">
                            {post.comment} Comments
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
