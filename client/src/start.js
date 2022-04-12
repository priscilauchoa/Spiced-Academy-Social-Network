import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";
// import Logout from "./logout";
import App from "./app";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data", data.userId);

        if (!data.userId) {
            ReactDOM.render(
                <>
                    <Logo />
                    <Welcome />
                </>,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(
                <>
                    <Logo />
                    {/* <Logout /> */}
                    <div className="line"></div>
                    <App />
                </>,
                document.querySelector("main")
            );
        }
    });
