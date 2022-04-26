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
                <button className="button-online" onClick={handleOnClick}>
                    {onlineUsers.length}
                    <img
                        className="online-img"
                        src="https://www.designbust.com/download/325/png/user_online_icon512.png"
                    ></img>
                </button>

                {isUserOnlineOpened && (
                    <div className="online-div">
                        {onlineUsers.length > 0 &&
                            onlineUsers.map((user) => {
                                return (
                                    <>
                                        <div
                                            className="online-users"
                                            key={user.id}
                                        >
                                            <img
                                                className="profile-pic-chat"
                                                src={user.profile_pic}
                                            ></img>
                                            <p>
                                                {user.first} {user.last}
                                            </p>
                                        </div>
                                    </>
                                );
                            })}
                        <button
                            className="button-close"
                            onClick={() => {
                                setIsUserOnlineOpened(false);
                            }}
                        >
                            Close
                        </button>
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
