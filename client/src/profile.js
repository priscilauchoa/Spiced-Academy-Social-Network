import BioEditor from "./bioEditor";
import ProfileHeader from "./profileHeader";

export default function Profile(props) {
    const bioContent = <BioEditor bio={props.bio} setBio={props.setBio} />;
    return (
        <ProfileHeader
            profilePic={props.img}
            firstName={props.first}
            lastName={props.last}
            bioContent={bioContent}
            clickHandler={props.clickHandler}
        />
    );
}
