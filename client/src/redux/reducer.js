import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import messagesReducer from "./messages/slice.js";
import onlineUsersReducer from "./onlineUsers/slice.js";

const rootReducer = combineReducers({
    FriendsWannaBees: friendsReducer,
    messages: messagesReducer,
    onlineUsers: onlineUsersReducer,
});

export default rootReducer;

// let obj = {
//     name: "Priscila",
// };

// let newObj = { ...obj };
// let coolObj = { ...obj, breed: "Bichon" };
// let arr = [1, 2, 3];
// let newArr = [...arr];
// let coolArr = [...arr, 4, 5];

// //MAP only works in ARRAY - cloning and changing return a new array

// //filter remove things from array
