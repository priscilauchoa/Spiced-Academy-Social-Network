import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProfileHeader from "./profileHeader";

export default function OtherProfile() {
    const [user, setUser] = useState({});
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`/api/user/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                if (!data.sucess) {
                    history.push("/");
                } else {
                    setUser(data.rows[0]);
                    console.log(user);
                }
            });
    }, []);
    const bioContent = <p>{user.bio}</p>;
    return (
        <ProfileHeader
            profilePic={user.profile_pic}
            firstName={user.first}
            lastName={user.last}
            bioContent={bioContent}
        />
    );
}
