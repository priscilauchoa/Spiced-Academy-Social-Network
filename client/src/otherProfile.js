import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProfileHeader from "./profileHeader";
import FriendButton from "./friendButton";

export default function OtherProfile() {
    const [user, setUser] = useState({});
    const params = useParams();
    const history = useHistory();
    // console.log("params ****", params);

    useEffect(() => {
        fetch(`/api/user/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                if (!data.sucess) {
                    history.push("/");
                } else {
                    setUser(data.rows[0]);
                    console.log("user", user);
                }
            });
    }, []);

    const hasUserId = user.id !== undefined;
    const bioContent = <p>{user.bio}</p>;
    return (
        <>
            <ProfileHeader
                profilePic={user.profile_pic}
                firstName={user.first}
                lastName={user.last}
                bioContent={bioContent}
            />
            {hasUserId && <FriendButton otherUserId={user.id} />}
        </>
    );
}
