import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const UserPostList = ({ posts }) => {
    const token = localStorage.getItem('token');
    const { username } = token ? jwt_decode(token) : { username: '' };
    const navigate = useNavigate();

    const navigateSinglePost = ({ _id, author, description, price, location, title, isAuthor }) => {
        navigate('/singlePost', {
            state: { _id, author, description, price, location, title, isAuthor }
        });
    };

    const navigateSendMessage = ({ _id, author, description, price, location, title, isAuthor, willDeliver }) => {
        navigate('/sendMessage', {
            state: { _id, author, description, price, location, title, isAuthor, willDeliver }
        });
    };

    return (
        <section>
            {posts.map(({ _id, author, description, price, location, title, isAuthor, willDeliver }) => (
                <div key={_id} className="posts">
                    <div onClick={() => navigateSinglePost({ _id, author, description, price, location, title, isAuthor })}>
                        <h2>{title}</h2>
                        {description && <h4>Description: {description}</h4>}
                        {price && <h4>Price: {price}</h4>}
                        {author && <h4>Seller: {author.username}</h4>}
                        {location && <h4>Location: {location}</h4>}
                        <h4>Willing to Deliver? {willDeliver ? 'Yes' : 'No'}</h4>
                    </div>
                    <div>
                        {author.username !== username && (
                            <button
                                onClick={() => navigateSendMessage({ _id, author, description, price, location, title, isAuthor, willDeliver })}
                                className="functionalButton"
                            >
                                Send Message
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}

UserPostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            author: PropTypes.shape({
                username: PropTypes.string.isRequired,
            }).isRequired,
            description: PropTypes.string,
            price: PropTypes.number,
            location: PropTypes.string,
            title: PropTypes.string.isRequired,
            isAuthor: PropTypes.bool.isRequired,
            willDeliver: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default UserPostList;
