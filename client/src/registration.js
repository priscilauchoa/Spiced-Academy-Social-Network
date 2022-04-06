import { Component } from "react";

export class Registration extends Component {
    constructor() {
        super();
        //super alows access all methods from Component
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        // console.log("registration just mounted");
    }

    handleChange(evt) {
        // console.log("input fields-->", evt.target.name);
        // console.log("What my user is typing-->", evt.target.value);
        //??? [evt.target.name]: evt.target.value
        this.setState({ [evt.target.name]: evt.target.value });
        console.log("submit was clicked", this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success == true) {
                    location.reload();
                } else {
                    resp.json({ success: false });
                }
            })
            .catch((err) => {
                console.log(err);
                // this.setState(this.state.error);
                this.setState({
                    [this.state.error]: true,
                });
            });
    }

    render() {
        return (
            <section>
                <h1>Register here</h1>
                {this.state.error && (
                    <h2>Something went wrong in the registration</h2>
                )}
                <form className="form">
                    <input
                        name="first"
                        placeholder="First Name"
                        type="first"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name="last"
                        placeholder="Last Name"
                        type="last"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    ></input>
                    <button onClick={this.handleSubmit}>Register</button>
                </form>
            </section>
        );
    }
}
