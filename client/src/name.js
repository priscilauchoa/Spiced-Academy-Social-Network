export function Name(props) {
    //lastName = "Duarte" -> name default if the props does not be defined on the start.js
    const { firstName, lastName = "Duarte" } = props;
    return (
        <>
            <strong>{firstName} </strong>
            <em> {lastName}</em>
        </>
    );
}
