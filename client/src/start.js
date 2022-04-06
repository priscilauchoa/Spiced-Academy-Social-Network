import ReactDOM from "react-dom";
import { Counter } from "./counter.js";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return (
        <div>
            <Counter />
        </div>
    );
}
