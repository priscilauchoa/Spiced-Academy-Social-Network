export default function friendsWannaBeesReducer(friends = [], action) {
    console.log("action payload in reducer -->", action.payload);
    if (action.type === "friends-wannabees/receive") {
        friends = action.payload.friends;
    } else if (action.type === "friends-wannabees/accept") {
        friends = friends.map((friend) => {
            if (friend.id === action.payload.id) {
                friend = { ...friend, accepted: true };
            }
            return friend;
        });
    } else if (action.type === "friends-wannabees/unfriend") {
        console.log("running in unfriend");
        friends = friends.filter((friend) => {
            if (friend.id != action.payload.id) {
                console.log("keeping friend", friend);
                return friend;
            }
        });
    }
    return friends;
}

export function receiveFriendsAndWannaBees() {
    return async (dispatch) => {
        const data = await fetch("/friendsandwannabee").then((response) =>
            response.json()
        );
        console.log("data-->", data);
        dispatch({
            type: "friends-wannabees/receive",
            payload: {
                friends: data.rows,
            },
        });
    };
}

export function makeFriend(id) {
    return {
        type: "friends-wannabees/accept",
        payload: { id },
    };
}
export function unfriend(id) {
    console.log("id in unfriend action ", id);
    return {
        type: "friends-wannabees/unfriend",
        payload: { id },
    };
}
