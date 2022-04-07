import { BrowserRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import Logo from "./logo";
import { Login } from "./login";
import { ResetPassword } from "./resetPassword";

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
                    <Route path="/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </>
    );
}
