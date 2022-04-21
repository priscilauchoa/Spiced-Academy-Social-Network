export default function friendsWannaBeesReducer(friends = [], action) {
    console.log("action payload in reducer -->", action.payload);
    if (action.type === "/friends-wannabees/receive") {
        friends = action.payload.rows;
    } else if (action.type === "/friends-wannabees/accept") {
        friends = friends.map((friend) => {
            if (friend.id === action.payload.id) {
                friend = { ...friend, accepted: true };
            }
            return friend;
        });
    } else if (action.type === "/friends-wannabees/unfriend") {
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

export function receiveFriendsAndWannaBees(rows) {
    console.log("in action receive friends and wannabe", rows);
    return {
        type: "/friends-wannabees/receive",
        payload: { rows },
    };
}
export function makeFriend(id) {
    return {
        type: "/friends-wannabees/accept",
        payload: { id },
    };
}
export function unfriend(id) {
    console.log("id in unfriend action ", id);
    return {
        type: "/friends-wannabees/unfriend",
        payload: { id },
    };
}

// function receiveUsers() {
//     return async (dispatch) => {
//         const data = await fetch("/users").then((response) => response.json());
//         dispatch({
//             type: "users/receivedUsers",
//             payload: {
//                 users: data.users,
//             },
//         });
//     };
// }
