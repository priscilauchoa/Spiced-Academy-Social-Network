import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";
import Menu from "./menu";
import OtherProfile from "./otherProfile";
import { BrowserRouter, Route } from "react-router-dom";
import Logo from "./logo";
import FriendAndWannaBees from "./friends-wannabees";

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

    handleProfilePictureClick = () => {
        this.setState({ isModalOpened: true });
        console.log("profilePic was click", this.state.isModalOpened);
    };

    render() {
        if (!this.state.id) {
            return (
                <>
                    <BrowserRouter>
                        <Logo />

                        <div className="line"></div>
                        <Menu />

                        <Route exact path="/">
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                img={this.state.profilePic}
                                bio={this.state.bio}
                                setBio={this.setBio}
                                clickHandler={this.handleProfilePictureClick}
                            />
                        </Route>
                        {/* <p>{this.state.first}</p> */}
                        <ProfilePic
                            styleCss="profile-pic-small"
                            props={(this.state.first, this.state.last)}
                            img={this.state.profilePic}
                            clickHandler={this.handleProfilePictureClick}
                        />
                        <Route path="/friends">
                            <FindPeople />
                        </Route>
                        <Route path="/friendsandwannabees">
                            <FriendAndWannaBees />
                        </Route>
                        <Route exact path="/user/:id">
                            <OtherProfile />
                        </Route>
                        {this.state.isModalOpened && (
                            <Uploader
                                onCloseModal={this.handleModalClose}
                                onProfilePictureChange={
                                    this.handleProfilePictureChange
                                }
                            />
                        )}
                    </BrowserRouter>
                </>
            );
        }
    }
}
