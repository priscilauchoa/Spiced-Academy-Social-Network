import { useSelector } from "react-redux";
import { socket } from "./socket.js";
import { useRef, useState, useEffect } from "react";

export function Chat() {
    const [value, setValue] = useState("Write a message here");
    const messages = useSelector((state) => state?.messages);
    const chatContainer = useRef();
    console.log("message)))))))--->", messages);

   useEffect(() => {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }, [messages]);

    };

    const sendMessages = () => {
        socket.emit("message", { message: value });
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log("Value in use state", value);
    };
    return (
        <>
            <section>
                <section ref={chatContainer} className="chat-container">
                    <h1>Timeline</h1>

                    <div>
                        {messages.length > 0 &&
                            messages.map((message) => {
                                return (
                                    <div key={message.id}>
                                        <p>User: {message.from_id}</p>
                                        <p>{message.message}</p>
                                    </div>
                                );
                            })}
                    </div>
                </section>

                <textarea
                    className="chat-textarea"
                    defaultValue={value}
                    onChange={handleChange}
                ></textarea>
                <button onClick={sendMessages}>Send Message</button>
            </section>
        </>
    );
}
