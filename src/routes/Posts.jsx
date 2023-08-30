import UserPost from "./components/UserPost";
import GuestPost from "./components/GuestPost";
import { useOutletContext } from "react-router-dom";

const Posts = () => {
    const [isLoggedIn] = useOutletContext(); 
    return isLoggedIn ? <UserPost /> : <GuestPost />;
};

export default Posts;
