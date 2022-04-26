import { useSelector } from "react-redux";
import { socket } from "./socket.js";
import { useRef, useState, useEffect } from "react";

export function Chat() {
    const [value, setValue] = useState("");
    const messages = useSelector((state) => state?.messages);
    const chatContainer = useRef();
    console.log("message))))))--->", messages);

    useEffect(() => {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }, [messages]);

    const sendMessages = () => {
        // setValue("");
        socket.emit("message", { message: value });
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log("Value in use state", value);
    };

    return (
        <>
            <section>
                <h1>Chat</h1>
                <section ref={chatContainer} className="chat-container">
                    <div>
                        {messages.length > 0 &&
                            messages.map((message) => {
                                return (
                                    <div className="chat" key={message.id}>
                                        <img
                                            className="profile-pic-chat"
                                            src={message.profile_pic}
                                        ></img>
                                        <p>
                                            {message.first} {message.last}
                                        </p>
                                        <p>{message.message}</p>
                                    </div>
                                );
                            })}
                    </div>
                </section>

                <textarea
                    className="chat-textarea"
                    value={value}
                    placeholder="Write your message here"
                    onChange={handleChange}
                ></textarea>
            </section>
            <button onClick={sendMessages}>Send Message</button>
        </>
    );
}
