import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
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
                    </>
                </Provider>,
                document.querySelector("main")
            );
        }
    });
