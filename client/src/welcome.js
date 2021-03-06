import { BrowserRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import { ResetPassword } from "./resetPassword";

export default function Welcome() {
    return (
        <>
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
