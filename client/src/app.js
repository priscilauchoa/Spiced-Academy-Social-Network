import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpened: false };
    }

    componentDidMount() {
        fetch("/user").then(() => {
            (res) =>
                res.json().then((data) => {
                    this.setState(data);
                });
        });
    }

    render() {
        if (!this.state.id) {
            return (
                <>
                    <img
                        className="logo"
                        src="https://cdn-icons-png.flaticon.com/512/2597/2597136.png"
                        alt="logo"
                    ></img>
                    <ProfilePic
                        props={(this.state.first, this.state.last)}
                        img={this.state.img}
                        clickHandler={() => {
                            this.setState({ isModalOpened: true });
                            console.log(
                                "profilePic was click",
                                this.state.isModalOpened
                            );
                        }}
                    />
                    {this.state.isModalOpened && <Uploader />}
                </>
            );
        }
    }
}
