import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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

    return (
        <div className="container">
            <img
                className="profile-pic"
                styleCss="profile-pic"
                src={
                    user.profile_pic ||
                    "https://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-User-icon.png"
                }
            />
            <div>
                <h1>
                    {user.first} {user.last}
                </h1>
                <p> here{user.bio}</p>
            </div>
        </div>
    );
}
