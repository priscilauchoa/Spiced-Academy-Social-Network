import { io } from "socket.io-client";
import { getAllMessages, receiveNewMessages } from "./redux/messages/slice.js";
import {showOnlineUsers} from "./redux/onlineUsers/slice.js";

export let socket;
// function to establishe connection with socket
export const init = (store) => {
    if (!socket) {
        console.log("Initialize connection 😁");
        socket = io.connect();
        socket.on("last-10-messages", (messages) => {
            store.dispatch(getAllMessages(messages));
        });

        socket.on("online-users", (onlineUsers) => {
            store.dispatch(showOnlineUsers(onlineUsers));
        });

        socket.on("message-broadcast", (message) => {
            store.dispatch(receiveNewMessages(message));
        });
    }
};
