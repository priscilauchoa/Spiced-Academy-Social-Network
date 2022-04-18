import { useEffect, useState, useCallback } from "react";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState([]);
    const [action, setAction] = useState();
    const otherUserId = props.otherUserId;
    const [buttonStyle, setButtonStyle] = useState();
    console.log("user**", props.otherUserId);

    // console.log(props);
    useEffect(() => {
        if (action === "request") {
            setButtonText("Add +");
            setButtonStyle("");
        } else if (action === "cancel") {
            setButtonText("Cancel request");
            setButtonStyle("cancel-request");
        } else if (action === "accept") {
            setButtonText("Accept request");
            setButtonStyle("accept-request");
        } else if (action === "unfriend") {
            setButtonText("Unfriend");
            setButtonStyle("cancel-request");
        }
    }, [action]);

    const fetchFriendship = useCallback(() => {
        fetch(`/friendship/${otherUserId}`)
            .then((res) => res.json())
            .then(({ rows }) => {
                console.log("rows from friendship", rows);
                if (rows.length == 0) {
                    setAction("request");
                } else {
                    setAction(rows[0].action);
                }
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    useEffect(() => {
        fetchFriendship();
    }, [fetchFriendship]);

    const handleClick = () => {
        fetch("/friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherUserId,
                action,
            }),
        })
            .then((res) => res.json())
            .then(({ success }) => {
                fetchFriendship();
            })
            .catch((err) => {
                console.log("err", err);
            });
        };

    return action ? (
        <button className={buttonStyle} onClick={handleClick}>
            {buttonText}
        </button>
    ) : null;
}
