//_____________________ONLINE USERS REDUCER_____________________

export default function onlineUsersReducer(onlineUsers = [], action) {
    if (action.type === "online-users/received") {
        console.log("action", action);

        console.log("online----", action.payload);
        return [...action.payload];
        // const newArray = [
        //     ...new Map(
        //         onlineUsers.map((item) => [item[item.id], item])
        //     ).values(),
        // ];
        // console.log("UNIQUE", newArray);

        // onlineUsers = Array.from(new Set(onlineUsers.map((a) => a.id))).map(
        //     (id) => {
        //         return onlineUsers.find((a) => a.id === id);
        //     }
        // );

        // return onlineUsers;
        // } else if (action.type === "online-users/new") {
        //     return (onlineUsers = [...onlineUsers, action.payload]);
    }

    return onlineUsers;
}

//______________________ACTIONS______________________________;

export function showOnlineUsers(data) {
    console.log("here -->", data);
    return {
        type: "online-users/received",
        payload: data,
    };
}

// export function newOnlineUsers(onlineUsers) {
//     console.log("online-users in new messgs", onlineUsers.onlineUsers);
//     return {
//         type: "online-users/new",
//         payload: onlineUsers,
//     };
// }
