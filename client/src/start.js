import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
// import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";
import thunk from "redux-thunk";
import { io } from "socket.io-client";

const socket = io.connect();

socket.on("greeting", (data) => {
    console.log("data: ", data);
});

socket.on("user-click-inform", (userClick) => {
    console.log("userClick: ", userClick);
});

socket.on("exceptMe", (data) => {
    console.log("data: ", data);
});

socket.on("private", (data) => {
    console.log("data: ", data);
});

socket.on("bob", (data) => {
    console.log("data: ", data);
});

socket.emit("thanks", [
    "hey there mr server",
    "thats so nice of you",
    "im so happy to be here",
]);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
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
                <Provider store={store}>
                    <>
                        <App />
                        <button
                            onClick={() =>
                                socket.emit("user-click", {
                                    info: [
                                        "thanks",
                                        "the user just clicked the button",
                                    ],
                                })
                            }
                        >
                            Click Me
                        </button>
                    </>
                </Provider>,
                document.querySelector("main")
            );
        }
    });
