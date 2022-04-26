import { useSelector } from "react-redux";
import { useState } from "react";
// import { useEffect } from "react";
// import { showOnlineUsers } from "./redux/onlineUsers/slice.js";
// import { socket } from "./socket.js";
// import { useRef, useState, useEffect } from "react";

export function OnlineUsers() {
    const [isUserOnlineOpened, setIsUserOnlineOpened] = useState(false);
    // const dispatch = useDispatch();
    let onlineUsers = useSelector((state) => state.onlineUsers);
    console.log("online users from component--->", onlineUsers);
    // onlineUsers = [...new Set(onlineUsers)];

    // useEffect(() => {
    //     dispatch(showOnlineUsers(onlineUsers.id));
    // }, []);

    const handleOnClick = () => {
        setIsUserOnlineOpened(true);
    };

    return (
        <>
            <section>
                <button onClick={handleOnClick}> Users online</button>

                {isUserOnlineOpened && (
                    <div>
                        {onlineUsers.length > 0 &&
                            onlineUsers.map((user) => {
                                return (
                                    <div className="online-users" key={user}>
                                        <img
                                            className="profile-pic-chat"
                                            src={user.profile_pic}
                                        ></img>
                                        <p>
                                            User: {user.first} {user.last}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setIsUserOnlineOpened(false);
                                            }}
                                        >
                                            {" "}
                                            Close
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                )}
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
