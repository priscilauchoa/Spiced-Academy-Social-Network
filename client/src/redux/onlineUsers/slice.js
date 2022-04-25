//______________________MESSAGES REDUCER_____________________

export default function onlineUsersReducer(onlineUsers = [], action) {
    if (action.type === "online-users/received") {
        console.log("action", action);
        return (onlineUsers = action.payload);
    }
    // else if (action.type === "messages/new") {
    //     return (onlineUsers = [...onlineUsers, action.payload]);
    // }

    return onlineUsers;
}

//______________________ACTIONS______________________________;

export function showOnlineUsers(onlineUsers) {
    return {
        type: "online-users/received",
        payload: onlineUsers,
    };
}

// export function newOnlineUsers(message) {
//     console.log("message in new messgs", message);
//     return {
//         type: "messages/new",
//         payload: message,
//     };
// }
