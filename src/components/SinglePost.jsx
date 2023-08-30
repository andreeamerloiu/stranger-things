import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { editPost, deletePost } from "../api/API";

const SinglePost = () => {
    const { state } = useLocation();
    const { _id } = state;
    const [thisPost, setThisPost] = useState({...state});
    const { author, description, price, location, willDeliver, title, messages } = thisPost;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const [postTitle, setPostTitle] = useState(title);
    const [postDescription, setPostDescription] = useState(description);
    const [postPrice, setPostPrice] = useState(price);
    const [postLocation, setPostLocation] = useState(location);
    const [postWillDeliver, setPostWillDeliver] = useState(willDeliver);
    const navigate = useNavigate();

    async function edit(e) {
        e.preventDefault()

        const post = {
            post: {
                title: postTitle,
                description: postDescription,
                price: postPrice,
                location: postLocation,
                willDeliver: postWillDeliver
            }
        }
        
        console.log(postTitle)
        console.log(postDescription)
        console.log(postPrice)
        console.log(postLocation)

        const token = localStorage.getItem('token')

        const response = await editPost(post, _id, token);

        const updatePosts = JSON.parse(localStorage.getItem('posts')).map((p) => {
            if (p._id === _id) {
                return response
            } else {
                return p
            }
        })
        localStorage.setItem('posts', JSON.stringify(updatePosts))
        setIsEdited(false);
        setThisPost(response);
        return response;
    }

    async function deletepost(e) {
        e.preventDefault()
        const response = await deletePost(_id, token);
        navigate('/posts');
        return response
    }
    
    return (
        <>
            <div key={_id} className="posts">
                <h2>{title}</h2>
                {description ? <h4>Description: {description}</h4> : null}
                {price ? <h4>Price: {price}</h4> : null}
                {author ? <h4>Seller: {author.username}</h4> : null}
                {location ? <h4>Location: {location}</h4> : null}
                {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
                {author.username === username ? <button onClick={() => {setIsEdited(true)}} className="functionalButton">Edit Post</button> : null}
                {author.username === username ? <button onClick={deletepost} className="functionalButton">Delete Post</button> : null}
            </div>
            {
                isEdited ? 
                <form onSubmit={edit} className="panel">
                    <h1>Edit Post</h1>
                    <input 
                        type="text" 
                        defaultValue={thisPost.title}
                        placeholder="title"
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <input 
                        type="text" 
                        defaultValue={thisPost.description}
                        placeholder="description"
                        onChange={(e) => setPostDescription(e.target.value)}
                    />
                    <input 
                        type="text" 
                        defaultValue={thisPost.price}
                        placeholder="price"
                        onChange={(e) => setPostPrice(e.target.value)}
                    />
                    <input 
                        type="text" 
                        defaultValue={thisPost.location}
                        placeholder="location"
                        onChange={(e) => setPostLocation(e.target.value)}
                    />
                    <label>
                        <input 
                            type="checkbox"
                            defaultChecked={thisPost.willDeliver}
                            onChange={() => setPostWillDeliver(!thisPost.willDeliver)}
                        />
                        <span>Willing to Deliver?</span>
                    </label>
                    <button type="submit" className="createButton">Edit</button>
                </form> : null
            }
            <div>
                {
                author.username === username 
                ? null : 
                messages?.map(({ _id, content, fromUser }) => (
                    <div key={_id}>
                        <h2>From: {fromUser}</h2>
                        <h4>{content}</h4>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default SinglePost;