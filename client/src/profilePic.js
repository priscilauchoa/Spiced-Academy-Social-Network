// import { Component } from "react";

// export default class ProfilePic extends Component {
//     constructor() {
//         super();
//         this.state = {};
//     }
//     render() {
//         return (
//             <>
//                 <img
//                     className="logo"
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFRNBFYr5Q0StPYj6EtWwomspixSzMGwKrfaG_8qDL-lt3t5yFDd7u1Guyu_cSKjmGUH0&usqp=CAU"
//                     alt="profile pic"
//                 ></img>
//             </>
//         );
//     }
// }
export default function ProfilePic(props) {
    return (
        <img
            className="logo"
            alt="user"
            src={
                props.img ||
                "https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"
            }
            onClick={props.clickHandler}
        ></img>
    );
}

// <img
//     className="logo"
//     src="https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"
//     alt="user"
// ></img>;
