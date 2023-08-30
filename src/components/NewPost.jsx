import { useState } from "react";
import { addNewPost } from "../api/API";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [postErrorMessage, setPostErrorMessage] = useState('');
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    async function submitPost(e) {
        e.preventDefault()

        const post = {
            post: {
                title,
                description,
                price,
                location: "[On Request]",
                willDeliver
            }
        }

        const response = await addNewPost(post, token);
        console.log(response);

        if (!title || !description || !price) {
            setPostErrorMessage('This is required Field')
        } else {
            navigate('/posts');
        }
    }

    return (
        <form onSubmit={submitPost} className="panel">
            <h1>Add New Post</h1>
            <input 
            type="text" 
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            />
            {postErrorMessage ? <p>{postErrorMessage}</p> : null}
            <input 
            type="text" 
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            />
            {postErrorMessage ? <p>{postErrorMessage}</p> : null}
            <input 
            type="text" 
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            />
            {postErrorMessage ? <p>{postErrorMessage}</p> : null}
            <input 
            type="text" 
            value={location}
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
            />
            <label>
                <input 
                    type="checkbox"
                    value={willDeliver}
                    onChange={() => setWillDeliver(!willDeliver)}
                />
                <span>Willing to Deliver?</span>
            </label>
            
            <button type="submit" className="createButton">Create</button>
        </form>
    )
}

export default NewPost;