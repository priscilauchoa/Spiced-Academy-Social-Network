import ProfilePic from "./profilePic";

const defaultProfilePic =
    "https://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-User-icon.png";

export default function ProfileHeader(props) {
    const { profilePic, firstName, lastName, bioContent } = props;

    return (
        <div className="container">
            <ProfilePic
                styleCss="profile-pic"
                img={profilePic || defaultProfilePic}
            />
            <div>
                <h1>
                    {firstName} {lastName}
                </h1>
                {bioContent}
            </div>
        </div>
    );
}
