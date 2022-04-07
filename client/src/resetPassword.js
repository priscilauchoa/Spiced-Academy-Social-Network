import { Component } from "react";
export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            error: false,
        };
        this.handleSubmitStart = this.handleSubmitStart.bind(this);
        this.handleSubmitVerify = this.handleSubmitVerify.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
        console.log("submit was clicked", this.state);
    }

    handleSubmitStart(e) {
        console.log("submit was clicked", this.state);

        e.preventDefault();
        fetch("/password/reset/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp);
                if (resp.success == true) {
                    this.setState({ step: 2 });
                } else {
                    this.setState({ step: 1 });
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: true });
            });
    }

    handleSubmitVerify(e) {
        console.log("submit was clicked", this.state);

        e.preventDefault();
        fetch("/password/reset/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp);
                if (resp.success == true) {
                    console.log(resp.success);
                    this.setState({ step: 3 });
                } else {
                    console.log(resp.success);
                    this.setState({ step: 2 });
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: true });
            });
    }

    display() {
        if (this.state.step == 1) {
            return (
                <>
                    {this.state.error && (
                        <h2 className="error-message">
                            Something went wrong , please try again
                        </h2>
                    )}
                    <h3>Reset Password</h3>
                    <p>
                        Please enter the e-mail adress with which you registered
                    </p>
                    <form className="form">
                        <input
                            name="email"
                            placeholder="E-mail"
                            type="email"
                            onChange={this.handleChange}
                        ></input>

                        <button onClick={this.handleSubmitStart}>Submit</button>
                    </form>
                </>
            );
        } else if (this.state.step == 2) {
            return (
                <>
                    {this.state.error && (
                        <h2 className="error-message">
                            Something went wrong in the code verification,
                            please try again
                        </h2>
                    )}
                    <h3>Reset Password</h3>
                    <p>Please enter the code which you received by e-mail</p>
                    <form className="form">
                        <input
                            name="code"
                            placeholder="Code"
                            type="text"
                            onChange={this.handleChange}
                        ></input>
                        <p>
                            Please enter the code which you received by e-mail
                        </p>

                        <input
                            name="password"
                            placeholder="New Password"
                            type="password"
                            onChange={this.handleChange}
                        ></input>

                        <button onClick={this.handleSubmitVerify}>
                            Submit
                        </button>
                    </form>
                </>
            );
        } else if (this.state.step == 3) {
            return <h3>Your password was successily changed</h3>;
        }
    }

    render() {
        return <div>{this.display()}</div>;
    }
}
