import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndWannaBees,
    makeFriend,
    unfriend,
} from "./redux/friends/slice.js";

export default function FriendAndWannaBees() {
    const dispatch = useDispatch();
    const wannabees = useSelector(
        (state) => state.FriendsWannaBees && state.FriendsWannaBees
    ).filter((friend) => !friend.accepted);

    const friends = useSelector(
        (state) => state.FriendsWannaBees && state.FriendsWannaBees
    ).filter((friend) => friend.accepted);

    // console.log("wannabees --->", wannabees);

    useEffect(() => dispatch(receiveFriendsAndWannaBees()), []);

    const handleClickMakeFriend = (id) => {
        fetch("/friendsandwannabee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                dispatch(makeFriend(id));
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    const handleClickUnfriend = (id) => {
        fetch("/friendsandwannabee/unfriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                dispatch(unfriend(id));
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    return (
        <section>
            <h1>Friends</h1>

            <section className="friends-and-wannabe">
                {friends.map((friend) => {
                    return (
                        <div key={friend.id} className="form">
                            {console.log("friend id -->", friend.id)}
                            <img
                                className="profile-pic"
                                src={friend.profile_pic}
                            ></img>
                            {friend.first} {friend.last}
                            <button
                                className="cancel-request margin"
                                onClick={() => handleClickUnfriend(friend.id)}
                            >
                                Unfriend
                            </button>
                        </div>
                    );
                })}
            </section>
            <h1>Friendship requests</h1>

            <section className="friends-and-wannabe">
                {wannabees.map((wannabee) => {
                    return (
                        <div key={wannabee.id} className="form">
                            <img
                                className="profile-pic"
                                src={wannabee.profile_pic}
                            ></img>
                            {wannabee.first} {wannabee.last}
                            <div>
                                <button
                                    className="accept-request margin"
                                    onClick={() =>
                                        handleClickMakeFriend(wannabee.id)
                                    }
                                >
                                    Accept
                                </button>
                                <button
                                    className="cancel-request"
                                    onClick={() =>
                                        handleClickUnfriend(wannabee.id)
                                    }
                                >
                                    Reject Friend
                                </button>
                            </div>
                        </div>
                    );
                })}
            </section>
        </section>
    );
}
