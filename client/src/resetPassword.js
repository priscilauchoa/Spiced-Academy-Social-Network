import { Component } from "react";
export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
        };
        this.handleSubmitStart = this.handleSubmitStart.bind(this);
        // this.handleSubmitveriFy = this.handleSubmitveriFy.bind(this);
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
                // if (resp.success == true) {
                //     location.reload();
                // } else {
                //     this.setState({ error: true });
                // }
            })
            .catch((err) => {
                console.log(err);
                // this.setState(this.state.error);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <>
                <h3>Reset Password</h3>
                <p>Please enter the e-mail adress with which you registered</p>
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
    }
}
