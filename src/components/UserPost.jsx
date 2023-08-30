import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import UserPostList from "./UserPostList";
import { fetchAllPost } from "../api/API";

const UserPost = () => {
    const token = localStorage.getItem('token')
    const [posts, setPosts] = useState([]);
    const { username } = jwt_decode(token);

    useEffect(() => {
        Promise.all([fetchAllPost()])
        .then(([posts]) => {
            setPosts(posts)
            console.log("UserPosts", posts);
        })
    }, []);

    const navigate = useNavigate();
    const navigateAddNewPost = () => {
        navigate('/newPost');
    };

    return (
        <div className="panel">
            <h1>Welcome {username}!</h1>
            <button onClick={navigateAddNewPost} className="functionalButton">Add New Post</button>
            <UserPostList posts={posts} />
        </div>
    )
};


export default UserPost;