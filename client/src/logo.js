import { Link } from "react-router-dom";
import Logout from "./logout";

export default function Logo() {
    return (
        <>
            <div className="nav">
                <h1>
                    <Link to="/">
                        <img
                            className="logo"
                            src="https://cdn-icons-png.flaticon.com/512/2597/2597136.png"
                        ></img>
                    </Link>
                    Support your Gang
                </h1>
                <Logout />
            </div>
        </>
    );
}
