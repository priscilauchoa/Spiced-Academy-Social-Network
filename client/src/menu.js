import { Link } from "react-router-dom";
export default function Menu() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/">Profile </Link>
                <Link to="/chat">Chat</Link>
                <Link to="/friends"> Find People</Link>
                <Link to="/friendsandwannabees">My Friends</Link>
            </nav>
        </>
    );
}
