import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";
import App from "./app";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data", data.userId);

        if (!data.userId) {
            ReactDOM.render(
                <>
                    <Welcome />
                </>,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(
                <>
                    <div className="line"></div>
                    <App />
                </>,
                document.querySelector("main")
            );
        }
    });
