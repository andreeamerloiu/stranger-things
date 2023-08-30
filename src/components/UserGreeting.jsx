import { useOutletContext } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const UserGreeting = () => {
    const [token] = useOutletContext(); 

    let username = '';

    try {
        const { username: decodedUsername } = jwt_decode(token);
        username = decodedUsername;
    } catch (error) {
        
        console.error("Error decoding token:", error);
    }

    return (
        <div className="panel">
            <h1>Welcome to Stranger Things!</h1>
            <h2>Logged in as {username}</h2>
        </div>
    );
};

export default UserGreeting;
