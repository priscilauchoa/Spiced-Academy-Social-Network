import { Link } from "react-router-dom";
export default function Menu() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/">Profile</Link>
                <Link to="/friends">Friends</Link>  
            </nav>
        </>
    );
}
