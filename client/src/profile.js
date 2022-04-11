import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile(props) {
    // console.log("propss-->", props);
    return (
        <div className="container">
            <ProfilePic styleCss="profile-pic" img={props.img} />{" "}
            <div>
                <h1>
                    {props.first} {props.last}
                </h1>

                <BioEditor bio={props.bio} setBio={props.setBio} />
            </div>
        </div>
    );
}
