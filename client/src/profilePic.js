export default function ProfilePic(props) {
    return (
        <img
            className={props.styleCss}
            alt="user"
            src={
                props.img ||
                "https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"
            }
            onClick={props.clickHandler}
        ></img>
    );
}
