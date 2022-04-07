import { BrowserRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import Logo from "./logo";
import { Login } from "./login";

export default function Welcome() {
    return (
        <>
            <Logo />
            <h1>Welcome</h1>

            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </>
    );
}
