import { useSelector } from "react-redux";
// import { socket } from "./socket.js";
// import { useRef, useState, useEffect } from "react";

export function OnlineUsers() {
    // const [value, setValue] = useState("");
    const onlineUsers = useSelector((state) => state?.onlineUsers);
    // const chatContainer = useRef();
    // console.log("message)))))))--->", messages);

    // useEffect(() => {
    //     chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    // }, [messages]);

    // const sendMessages = () => {
    //     setValue("");

    //     socket.emit("message", { message: value });
    // };

    // const handleChange = (e) => {
    //     setUsers(e.target.value);
    //     console.log("Value in use state", value);
    // };

    return (
        <>
            <section>
                {/* <section ref={chatContainer} className="chat-container">
                    <h1>Timeline</h1> */}

                <div>
                    {onlineUsers.length > 0 &&
                        onlineUsers.map((user) => {
                            return (
                                <div className="chat" key={user.id}>
                                    {" "}
                                    Users online
                                    <img
                                        className="profile-pic-chat"
                                        src=""
                                    ></img>
                                    <p>{user.id}: </p>
                                </div>
                            );
                        })}
                </div>
            </section>

            {/* <textarea
                    className="chat-textarea"
                    value={value}
                    placeholder="Write your message here"
                    onChange={handleChange}
                ></textarea>
                <button onClick={sendMessages}>Send Message</button>
            </section> */}
        </>
    );
}
