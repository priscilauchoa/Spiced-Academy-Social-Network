//______________________MESSAGES REDUCER_____________________

export default function messagesReducer(messages = [], action) {
    if (action.type === "messages/received") {
        // console.log("action", action);
        return (messages = action.payload.reverse());
    } else if (action.type === "messages/new") {
        return (messages = [...messages, action.payload]);
    }

    return messages;
}

//______________________ACTIONS______________________________;

export function getAllMessages(data) {
    return {
        type: "messages/received",
        payload: data.messages,
    };
}

export function receiveNewMessages(message) {
    // console.log("message in new messgs", message);
    return {
        type: "messages/new",
        payload: message,
    };
}
