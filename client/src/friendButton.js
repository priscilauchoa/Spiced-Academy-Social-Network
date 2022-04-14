import { useEffect, useState } from "react";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState([]);
    const otherUser = props.otherUserId;
    console.log("user**", otherUser);

    // console.log(props);

    useEffect(() => {
        fetch(`/friendship/${otherUser}`)
            .then((res) => res.json())
            .then(({ rows }) => {
                console.log("rows from friendship", rows);
                if (rows.length == 0) {
                    setButtonText("Add +");
                }
                if (rows[0].accept == false) {
                    setButtonText("Cancel request");
                } else {
                    setButtonText("Cancel request");
                }
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    const handleClick = () => {
        if (buttonText == "Add +") {
            fetch("/friendship-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUser,
                }),
            })
                .then((res) => res.json())
                .then(({ success }) => {
                    console.log("success", success);
                    if (success) {
                        setButtonText("Cancel request");
                        // } else {
                        //     setButtonText("Add +");
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };

    return <button onClick={handleClick}>{buttonText}</button>;
}
