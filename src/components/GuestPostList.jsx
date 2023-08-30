import PropTypes from 'prop-types';

const GuestPostList = ({ posts }) => {
    return (
        <section>
            {
                posts.map(({ id, author, description, price, location, willDeliver, title })=> (
                    <div key={id} className="post">
                        <h2>{title}</h2>
                        {description ? <h4>{description}</h4> : null}
                        {price ? <h4>Price: {price}</h4> : null}
                        {author ? <h4>Seller: {author.username}</h4> : null}
                        {location ? <h4>Location: {location}</h4> : null}
                        {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
                    </div>
                ))
            }
        </section>
    );
}

GuestPostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired
        }),
        description: PropTypes.string,
        price: PropTypes.string,
        location: PropTypes.string,
        willDeliver: PropTypes.bool,
        title: PropTypes.string.isRequired
    })).isRequired
};

export default GuestPostList;

