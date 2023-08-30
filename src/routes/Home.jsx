 import UserGreeting from "./components/UserGreeting";
import GuestGreeting from "./components/GuestGreeting";
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const [isLoggedIn] = useOutletContext(); 
    return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
};

export default Home;
