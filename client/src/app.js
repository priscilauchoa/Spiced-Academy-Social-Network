import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";
import { Link } from "react-router-dom";
// import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpened: false };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then(({ rows }) => {
                console.log("data user", rows);
                this.setState({
                    first: rows[0].first,
                    last: rows[0].last,
                    bio: rows[0].bio,
                    profilePic: rows[0].profile_pic,
                });
                this.setState({
                    isModalOpened: false,
                });
            });
    }
    // toogleModal(){}

    setBio(newBio) {
        this.setState({ bio: newBio });
    }

    handleProfilePictureChange = (img) => {
        console.log("image", img);
        this.setState({ profilePic: img, isModalOpened: false });
    };

    handleModalClose() {
        this.setState({
            isModalOpened: false,
        });
    }

    render() {
        if (!this.state.id) {
            return (
                <>
                    {/* <img
                        className="logo"
                        src="https://cdn-icons-png.flaticon.com/512/2597/2597136.png"
                        alt="logo"
                    ></img> */}
                    {/* <BrowserRouter>
                        <Route to="/users">
                            <FindPeople />
                        </Route> */}

                    {/* <Link to="/">Friends</Link>; */}
                    <ProfilePic
                        styleCss="profile-pic-small"
                        props={(this.state.first, this.state.last)}
                        img={this.state.profilePic}
                        clickHandler={() => {
                            this.setState({ isModalOpened: true });
                            console.log(
                                "profilePic was click",
                                this.state.isModalOpened
                            );
                        }}
                    />
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        img={this.state.profilePic}
                        bio={this.state.bio}
                        setBio={this.setBio}
                    />
                    <FindPeople />
                    {/* </BrowserRouter> */}
                    {this.state.isModalOpened && (
                        <Uploader
                            onCloseModal={this.handleModalClose}
                            onProfilePictureChange={
                                this.handleProfilePictureChange
                            }
                            // clickHandler={() => {
                            //     this.setState({ img: this.state.img });
                            // }}
                        />
                    )}
                </>
            );
        }
    }
}
