import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data", data.userId);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                // <img src="/logo.gif" alt="logo" />
                <Logo />,
                document.querySelector("main")
            );
        }
    });
